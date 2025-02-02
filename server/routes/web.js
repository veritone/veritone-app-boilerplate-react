let express = require('express');
let config = require('./../config/request');
let helper = require('./../helper/router');
let rp = require('request-promise');

let router = express.Router();

// My Apps page or developer page
router.get('/apps', async function(req, res) {
  console.log('get apps');
  let requestString, allApps, views, statistics, toastType, toastMessage;

  // Get app versions
  requestString =
    '/apps/versions?developerId=' +
    config.DEVELOPER_ID +
    '&query=' +
    encodeURIComponent(
      '{$or: [{"status.value":"rejected",isLatestVersion:true},{isLive:true},{"status.value":{$in:["inDevelopment","inReview","pending"]}}]}'
    );
  allApps = await openChannelRequest(requestString, req, res);
  if (allApps.status === 'error') {
    return res.render('app/error', { error: allApps });
  }

  // Get statistics after retreiving app versions
  requestString =
    '/stats/series/month/views?query=' +
    encodeURIComponent("{developerId: '" + config.DEVELOPER_ID + "'}");
  statistics = await openChannelRequest(requestString, req, res);
  if (statistics.status === 'error') {
    return res.render('app/error', { error: statistics });
  }

  views = 0;
  toastType = req.session.toast_type;
  toastMessage = req.session.toast_message;
  for (let i = 0; i < statistics.length; i++) {
    views += statistics[i][1];
  }
  try {
    statistics = await JSON.stringify(statistics);
  } catch (e) {
    res.render('app/500error');
    return;
  }

  req.session.toast_type = '';
  req.session.toast_message = '';
  // res.send(allApps)
  res.render('app/app-show', {
    app: allApps,
    statistics: statistics,
    toast_type: toastType,
    toast_message: toastMessage,
    views: views
  });
});

router.get('/getApps', async function(req, res) {
  console.log('get apps');
  let requestString, allApps, views, statistics, toastType, toastMessage;

  // Get app versions
  requestString =
    '/apps/versions?developerId=' +
    config.DEVELOPER_ID +
    '&query=' +
    encodeURIComponent(
      '{$or: [{"status.value":"rejected",isLatestVersion:true},{isLive:true},{"status.value":{$in:["inDevelopment","inReview","pending"]}}]}'
    );
  allApps = await openChannelRequest(requestString, req, res);
  if (allApps.status === 'error') {
    return res.render('app/error', { error: allApps });
  }

  // Get statistics after retreiving app versions
  requestString =
    '/stats/series/month/views?query=' +
    encodeURIComponent("{developerId: '" + config.DEVELOPER_ID + "'}");
  statistics = await openChannelRequest(requestString, req, res);
  if (statistics.status === 'error') {
    return res.render('app/error', { error: statistics });
  }

  views = 0;
  toastType = req.session.toast_type;
  toastMessage = req.session.toast_message;
  for (let i = 0; i < statistics.length; i++) {
    views += statistics[i][1];
  }
  try {
    statistics = await JSON.stringify(statistics);
  } catch (e) {
    res.render('app/500error');
    return;
  }

  req.session.toast_type = '';
  req.session.toast_message = '';
  res.send(allApps);
  // res.render('app/app-show', { app: allApps, statistics: statistics, toast_type: toastType, toast_message: toastMessage, views: views });
});

// index page
router.get('/', async function(req, res) {
  let requestString, approved, featured;
  // request for approved apps
  requestString =
    '/apps?userId=' +
    config.USER_ID +
    '&query=' +
    encodeURIComponent('{"status.value":"approved"}') +
    '&sort=' +
    encodeURIComponent('{"randomize":1}');
  approved = await openChannelRequest(requestString, req, res);
  if (approved.status === 'error') {
    return res.render('app/error', { error: approved });
  }
  // request for featured apps
  requestString =
    '/apps?userId=' +
    config.USER_ID +
    '&query=' +
    encodeURIComponent(
      '{"status.value":"approved","attributes.featured":"yes"}'
    ) +
    '&sort=' +
    encodeURIComponent('{"randomize":1}');
  featured = await openChannelRequest(requestString, req, res);
  if (featured.status === 'error') {
    return res.render('app/error', { error: featured });
  }
  res.render('app/index', { apps: approved, featured: featured });
});
// detail-page
router.get('/details/:safeName', async function(req, res) {
  let requestString, app, relatedApps, category, appid, user;

  // main app request
  requestString =
    '/apps/bySafeName/' +
    req.params.safeName +
    '?userId=' +
    config.USER_ID +
    '&trackViews=true';
  app = await openChannelRequest(requestString, req, res);
  if (app.status === 'error') {
    return res.render('app/error', { error: app });
  }
  try {
    category = await JSON.stringify(app.customData.category);
    appid = await JSON.stringify(app.appId);
  } catch (e) {
    res.render('app/500error');
    return;
  }

  // related apps request
  requestString =
    '/apps?userId=' +
    config.USER_ID +
    '&query=' +
    encodeURIComponent(
      '{"status.value":"approved","customData.category":{$in:' +
        category +
        '},"appId":{$ne:' +
        appid +
        '}}'
    ) +
    '&sort=' +
    encodeURIComponent('{"randomize":1}');
  relatedApps = await openChannelRequest(requestString, req, res);
  if (relatedApps.status === 'error') {
    return res.render('app/error', { error: relatedApps });
  }

  user = 'naiveUser';
  res.render('app/detail-page', {
    apps: app,
    related: relatedApps,
    user: user
  });
});

// detail-page from developer page
router.get('/details/:appId/:version', async function(req, res) {
  console.log('details page');
  let requestString, app, relatedApps, category, appid, user;
  // main app request
  requestString =
    '/apps/' +
    req.params.appId +
    '/versions/' +
    req.params.version +
    '?developerId=' +
    config.DEVELOPER_ID;
  app = await openChannelRequest(requestString, req, res);
  console.log('aaaaap', app);
  if (app.status === 'error') {
    return res.render('app/error', { error: app });
  }
  // try {
  // 	category = await JSON.stringify(app.customData.category);
  // 	appid = await JSON.stringify(app.appId);
  // } catch (e) {
  // 	res.render('app/500error');
  // 	return;
  // }

  // related apps request
  // requestString = '/apps?userId=' + config.USER_ID + '&query=' + encodeURIComponent('{"status.value":"approved","customData.category":{$in:' + category + '},"appId":{$ne:' + appid + '}}') + '&sort=' + encodeURIComponent('{"randomize":1}');
  // relatedApps = await openChannelRequest(requestString, req, res);
  // if (relatedApps.status === 'error') {
  // 	return res.render('app/error', {error: relatedApps});
  // }
  user = 'developer';
  // res.render('app/detail-page', { apps: app, related: relatedApps, user: user });
  // res.render('app/detail-page', { apps: app, related: {}, user: user });
  console.log('before send');
  res.send(app);
});

// category filter using ajax on index page
router.get('/web.js/category-filter?', async function(req, res) {
  let requestString, apps, reqstring;
  reqstring =
    '{"status.value":"approved","customData.category":"' +
    req.query.category +
    '"}';
  // request for apps in a category
  requestString =
    '/apps?userId=' +
    config.USER_ID +
    '&query=' +
    encodeURIComponent(reqstring) +
    '&sort=' +
    encodeURIComponent('{"randomize":1}');
  apps = await openChannelRequest(requestString, req, res);
  if (apps.status === 'error') {
    return res.render('app/error', { error: apps });
  }
  res.send(apps.list);
});

// collection filter using ajax on index page
router.get('/web.js/collection-filter?', async function(req, res) {
  let requestString, reqstring, apps;
  let owner = '';
  let sort = '';

  // All apps
  if (req.query.collection === 'All Apps') {
    reqstring = '{"status.value":"approved"}';
  } else if (req.query.collection === 'My Apps') {
    // My Apps
    reqstring = '{"status.value":"approved"}';
    owner = '&isOwner=true';
  } else if (req.query.collection === 'Popular') {
    // popular apps
    reqstring = '{"status.value":"approved"}';
    sort = '&sort=' + encodeURIComponent('{"statistics.views.30day" : -1}');
  } else if (req.query.collection === 'Featured') {
    // featured apps
    reqstring = '{"status.value":"approved","attributes.featured":"yes"}';
    sort = '&sort=' + encodeURIComponent('{"randomize":1}');
  }
  requestString =
    '/apps?userId=' +
    config.USER_ID +
    '&query=' +
    encodeURIComponent(reqstring) +
    sort +
    owner;
  apps = await openChannelRequest(requestString, req, res);
  if (apps.status === 'error') {
    return res.render('app/error', { error: apps });
  }
  res.send(apps.list);
});

// search apps using ajax on index page
router.get('/web.js/search?', async function(req, res) {
  let requestString, apps, reqstring;
  let fields = '["name","customData.description","customData.summary"]';
  let searchText = req.query.searchText;
  let sort = '';
  let owner = '';

  // search apps in any category
  if (req.query.set === 'category') {
    reqstring =
      '{"status.value":"approved","customData.category":"' +
      req.query.category +
      '"}';
    sort = '&sort=' + encodeURIComponent('{"randomize":1}');
  } else if (req.query.set === 'collection') {
    // search apps in collections
    if (req.query.collection === 'All Apps') {
      reqstring = '{"status.value":"approved"}';
    } else if (req.query.collection === 'My Apps') {
      // search within my app
      reqstring = '{"status.value":"approved"}';
      owner = '&isOwner=true';
    } else if (req.query.collection === 'Popular') {
      // search within popular apps
      reqstring = '{"status.value":"approved"}';
      sort = '&sort=' + encodeURIComponent('{"statistics.views.30day" : -1}');
    } else if (req.query.collection === 'Featured') {
      // search within featured apps
      reqstring = '{"status.value":"approved","attributes.featured":"yes"}';
      sort = '&sort=' + encodeURIComponent('{"randomize":1}');
    }
  } else if (req.query.set === '') {
    // search apps
    reqstring = '{"status.value":"approved"}';
    sort = '&sort=' + encodeURIComponent('{"randomize":1}');
  }
  if (searchText === '') {
    requestString =
      '/apps?userId=' +
      config.USER_ID +
      '&query=' +
      encodeURIComponent(reqstring) +
      sort +
      owner;
    apps = await openChannelRequest(requestString, req, res);
    if (apps.status === 'error') {
      return res.render('app/error', { error: apps });
    }
  } else {
    requestString =
      '/apps/textSearch?userId=' +
      config.USER_ID +
      '&query=' +
      encodeURIComponent(reqstring) +
      '&text=' +
      encodeURIComponent(searchText) +
      '&fields=' +
      encodeURIComponent(fields) +
      sort +
      owner;
    apps = await openChannelRequest(requestString, req, res);
    if (apps.status === 'error') {
      return res.render('app/error', { error: apps });
    }
  }

  res.send(apps.list);
});

// Create page
router.get('/apps/create', function(req, res) {
  let toastType = req.session.toast_type;
  let toastMessage = req.session.toast_message;
  res.render('app/app-create', {
    toast_type: toastType,
    toast_message: toastMessage
  });
});

// Edit page
router.get('/apps/update/:id/:version', async function(req, res) {
  let requestString, app, statistics, views, toastType, toastMessage;
  requestString =
    '/apps/' +
    req.params.id +
    '/versions/' +
    req.params.version +
    '?developerId=' +
    config.DEVELOPER_ID;
  app = await openChannelRequest(requestString, req, res);
  if (app.status === 'error') {
    return res.render('app/error', { error: app });
  }
  try {
    // Set file list and image list if exists.
    if (app.customData.files) {
      app.customData.fileList = app.customData.files
        .toString()
        .split(',')
        .filter(function(el) {
          return el.length !== 0;
        });
    }
    if (app.customData.images) {
      app.customData.imageList = app.customData.images
        .toString()
        .split(',')
        .filter(function(el) {
          return el.length !== 0;
        });
    }
    // Get app statistics after retrieving app version
    requestString =
      '/stats/series/month/views?query=' +
      encodeURIComponent(
        "{appId: '" +
          app.appId +
          "', developerId: '" +
          config.DEVELOPER_ID +
          "'}"
      );
    statistics = await openChannelRequest(requestString, req, res);
    if (statistics.status === 'error') {
      return res.render('app/error', { error: statistics });
    }
    views = 0;
    toastType = req.session.toast_type;
    toastMessage = req.session.toast_message;

    for (let i = 0; i < statistics.length; i++) {
      views += statistics[i][1];
    }
    try {
      statistics = await JSON.stringify(statistics);
    } catch (e) {
      res.render('app/500error');
      return;
    }

    req.session.toast_type = '';
    req.session.toast_message = '';
  } catch (e) {
    res.render('app/500error');
    return;
  }

  res.render('app/app-edit', {
    app: app,
    statistics: statistics,
    toast_type: toastType,
    toast_message: toastMessage,
    views: views
  });
});

// common request function
async function openChannelRequest(requestString, req, res) {
  let responseData, responseJson;
  // sending request to openchannel API
  let request = helper.getOptions(requestString, 'GET');

  try {
    responseData = await rp(request);
    responseJson = await JSON.parse(responseData);
  } catch (e) {
    if (!e.statusCode) {
      return {
        status: 'error',
        code: 500,
        errorMessage: 'internal server error'
      };
    }
    let error = JSON.parse(e.error);
    return {
      status: 'error',
      code: e.statusCode,
      errorMessage: error.errors[0].message
    };
  }
  return responseJson;
}

module.exports = router;
