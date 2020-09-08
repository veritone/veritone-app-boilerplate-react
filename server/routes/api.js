let express = require('express');
let fs = require('fs');
let formidable = require('formidable');
let request = require('request');
let config = require('./../config/request');
let helper = require('./../helper/router');
let rp = require('request-promise');

let router = express.Router();

// File upload route
router.post('/upload', function(req, res) {
  let form = new formidable.IncomingForm();

  // When the file is uploaded from frontend
  form.on('file', function(field, file) {
    let formData = {
      file: fs.createReadStream(file.path).on('data', function(chunk) {
        /* Monitor progress of file upload from this endpoint to openchannel API (Reserved for later) */
        console.log(chunk.length + ' bytes sent');
      })
    };

    // Send the uploaded file to openchannel API endpoint
    request.post(
      {
        url: 'https://market.openchannel.io/v2/files',
        formData: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization:
            'Basic ' +
            new Buffer(config.MARKETPLACE_ID + ':' + config.SECRET).toString(
              'base64'
            )
        }
      },
      function(err, httpResponse, body) {
        if (err) {
          return console.error('upload failed:', err);
          res.send('error');
        }
        console.log('Upload successful!  Server responded with:', body);
        res.send(JSON.parse(body).fileUrl);
      }
    );
  });

  form.on('error', function(err) {
    console.log('An error has occured: \n' + err);
  });

  form.parse(req);
});

//  create app
router.post('/apps/create', async function(req, res) {
  console.log('cccreate', req.body);
  let requestString, appCreated, appName, publish;
  // string to array conversion for images
  // if (req.body.images.search(',') !== -1) {
  // 	let img = req.body.images.split(',');
  // 	req.body.images = img;
  // } else if (req.body.images === '') {
  // 	req.body.images = [];
  // } else if (req.body.images.search(',') === -1) {
  // 	let img = [req.body.images];
  // 	req.body.images = img;
  // }
  // // string to array conversion for files
  // if (req.body.files.search(',') !== -1) {
  // 	let file = req.body.files.toString().split(',');
  // 	req.body.files = file;
  // } else if (req.body.files === '') {
  // 	req.body.files = [];
  // } else if (req.body.files.search(',') === -1) {
  // 	let file = [req.body.files];
  // 	req.body.files = file;
  // }
  // appName = req.body.name;
  // publish = req.body.publish;
  appName = req.body.name;
  publish = true;
  delete req.body.name;
  // delete req.body.publish;

  let body = {
    developerId: config.DEVELOPER_ID,
    name: appName,
    customData: req.body
  };

  console.log('body:  ', body);
  // app creation request
  requestString = '/apps';
  appCreated = await openChannelRequest(requestString, 'POST', body, req, res);

  // If error was retrieved, display error message and return
  if (appCreated.status === 'error') {
    console.log('error create', appCreated);
    // req.session.toast_type = 'error';
    // req.session.toast_message = appCreated.errorMessage;
    // res.redirect('/apps/create');
    res.send('error');
  }
  // App should be published
  if (publish === 'true') {
    let publishBody = {
      developerId: config.DEVELOPER_ID,
      version: parseInt(appCreated.version)
    };
    // Publish that app
    requestString = '/apps/' + appCreated.appId + '/publish';
    let publishResponse = await openChannelRequest(
      requestString,
      'POST',
      publishBody,
      req,
      res
    );

    // If error was retrieved, display error message and return
    if (publishResponse.status === 'error') {
      req.session.toast_type = 'error';
      req.session.toast_message = publishResponse.errorMessage;
      res.redirect('/apps/create');
      return;
    }

    // Display success message
    req.session.toast_type = 'publish';
    res.redirect('/apps');
  } else {
    // App will be published later
    // Display success message
    // req.session.toast_type = 'create';
    // res.redirect('/apps');
    console.log('success create');
    res.send(appCreated);
  }
});

// Update app route
router.post('/apps/update', async function(req, res) {
  let requestString, appEdited, appName, publish, appId, version;
  // string to array conversion for images

  if (req.body.images !== undefined) {
    if (req.body.images.search(',') !== -1) {
      let img = req.body.images.split(',');
      req.body.images = img;
    } else if (req.body.images === '') {
      req.body.images = [];
    } else if (req.body.images.search(',') === -1) {
      let img = [req.body.images];
      req.body.images = img;
    }
  }

  // string to array conversion for files
  if (req.body.files !== undefined) {
    if (req.body.files.search(',') !== -1) {
      let file = req.body.files.split(',');
      req.body.files = file;
    } else if (req.body.files === '') {
      req.body.files = [];
    } else if (req.body.files.search(',') === -1) {
      let file = [req.body.files];
      req.body.files = file;
    }
  }
  appName = req.body.name;
  publish = req.body.publish;
  appId = req.body.appId;
  version = req.body.version;
  delete req.body.name;
  delete req.body.publish;
  delete req.body.method;
  delete req.body.appId;
  delete req.body.version;

  let body = {
    developerId: config.DEVELOPER_ID,
    name: appName,
    customData: req.body
  };

  // app editing request
  requestString = '/apps/' + appId + '/versions/' + version;
  appEdited = await openChannelRequest(requestString, 'POST', body, req, res);

  // If error was retrieved, display error message and return
  if (appEdited.status === 'error') {
    req.session.toast_type = 'error';
    req.session.toast_message = appEdited.errorMessage;
    res.redirect('/apps/create');
    return;
  }
  // App should be published
  if (publish === 'true') {
    let publishBody = {
      developerId: config.DEVELOPER_ID,
      version: parseInt(appEdited.version)
    };
    // Publish that app
    requestString = '/apps/' + appEdited.appId + '/publish';
    let publishResponse = await openChannelRequest(
      requestString,
      'POST',
      publishBody,
      req,
      res
    );

    // If error was retrieved, display error message and return
    if (publishResponse.status === 'error') {
      req.session.toast_type = 'error';
      req.session.toast_message = publishResponse.errorMessage;
      res.redirect('/apps/create');
      return;
    }

    // Display success message
    req.session.toast_type = 'publish';
    res.redirect('/apps');
  } else {
    // App will be published later
    // Display success message
    req.session.toast_type = 'update';
    res.redirect('/apps');
  }
});

// Publish app route
router.post('/apps/publish', async function(req, res) {
  let requestString, publishResponse;
  let body = {
    developerId: config.DEVELOPER_ID,
    version: parseInt(req.body.version)
  };
  // Publish that app
  requestString = '/apps/' + req.body.appId + '/publish';
  publishResponse = await openChannelRequest(
    requestString,
    'POST',
    body,
    req,
    res
  );

  // If error is retrieved, display error message and return
  if (publishResponse.status === 'error') {
    req.session.toast_type = 'error';
    req.session.toast_message =
      'There was an error publishing the app. Please try again';
    res.send('error');
    return;
  }

  // Display success message and return
  req.session.toast_type = 'publish';
  res.send('success');
});

// Delete app route
router.post('/apps/delete', async function(req, res) {
  let requestString, deleteResponse;

  // If version is set, delete that version
  if (typeof req.body.version !== 'undefined') {
    requestString =
      '/apps/' +
      req.body.appId +
      '/versions/' +
      req.body.version +
      '?developerId=' +
      config.DEVELOPER_ID;
    deleteResponse = await openChannelRequest(
      requestString,
      'DELETE',
      'nobody',
      req,
      res
    );
  } else {
    // If version is not set, delete all app versions
    requestString =
      '/apps/' + req.body.appId + '?developerId=' + config.DEVELOPER_ID;
    deleteResponse = await openChannelRequest(
      requestString,
      'DELETE',
      'nobody',
      req,
      res
    );
  }

  // If error is retreived, display error message and return
  if (deleteResponse.status === 'error') {
    req.session.toast_type = 'error';
    req.session.toast_message = deleteResponse.errorMessage;
    return res.send('error');
  } else {
    // Display success message
    req.session.toast_type = 'delete';
    return res.send('success');
  }
});

// suspend or unsuspend apps
router.post('/apps/status', async function(req, res) {
  let statusResponse, requestString;
  let body = {
    developerId: config.DEVELOPER_ID,
    status: req.body.status
  };
  requestString = '/apps/' + req.body.appId + '/status';
  statusResponse = await openChannelRequest(
    requestString,
    'POST',
    body,
    req,
    res
  );
  if (!statusResponse) {
    return res.render('app/500error');
  }
  // If error is retrieved, display error message and return
  if (statusResponse.status === 'error') {
    req.session.toast_type = 'error';
    req.session.toast_message = statusResponse.errorMessage;
    res.send('error');
    return;
  }

  // Display success message and return
  req.session.toast_type = 'status';
  req.session.toast_message = 'App ' + req.body.status + 'ed successfully';
  res.send('success');
});

// Details page , app install or uninstall
router.post('/details', async function(req, res) {
  let requestString, uninstallResponse, installResponse;
  let installBody = {
    appId: req.body.apps.appId,
    userId: config.USER_ID,
    modelId: req.body.apps.model[0].modelId
  };

  let uninstallBody = {
    userId: config.USER_ID
  };

  // uninstall app code
  if (
    req.body.appStatus === 'active' ||
    req.body.appStatus === 'newapp active'
  ) {
    let ownershipid;
    if (req.body.appStatus === 'newapp active') {
      ownershipid = req.body.ownerid;
    } else if (req.body.appStatus === 'active') {
      ownershipid = req.body.apps.ownership.ownershipId;
    }
    requestString = '/ownership/uninstall/' + ownershipid;
    // uninstall request
    uninstallResponse = await openChannelRequest(
      requestString,
      'POST',
      uninstallBody,
      req,
      res
    );

    // If error is retrieved, display error message and return
    if (uninstallResponse.status === 'error') {
      res.send('error uninstalling');
      return;
    }
    if (req.body.appStatus === 'newapp active') {
      res.json(uninstallResponse);
      return;
    }
    res.send('uninstalled');
  } else if (
    req.body.appStatus === 'uninstalled' ||
    req.body.appStatus === 'newapp' ||
    req.body.appStatus === 'newapp uninstalled'
  ) {
    // install app code
    requestString = '/ownership/install';
    // install request
    installResponse = await openChannelRequest(
      requestString,
      'POST',
      installBody,
      req,
      res
    );
    // If error is retrieved, display error message and return
    if (installResponse.status === 'error') {
      res.send('error installing');
      return;
    }
    if (
      req.body.appStatus === 'newapp' ||
      req.body.appStatus === 'newapp uninstalled'
    ) {
      res.json(installResponse);
      return;
    }
    res.send('installed');
  }
});

// common request function
async function openChannelRequest(requestString, method, body, req, res) {
  let request, responseData, responseJson;
  if (body === 'nobody') {
    // sending request to openchannel API
    request = helper.getOptions(requestString, method);
  } else {
    body = await JSON.stringify(body);
    // sending request to openchannel API
    request = helper.getOptions(requestString, method, body);
  }
  try {
    responseData = await rp(request);
    responseJson = JSON.parse(responseData);
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
