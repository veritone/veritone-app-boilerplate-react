var config = require('./../config/request');

var router = {
  getOptions: function(endPoint, method, body) {
    if (body !== undefined) {
      return {
        url:
          'https://' +
          config.HOST_URL +
          ':' +
          443 +
          '/' +
          config.API_VERSION +
          endPoint,
        method: method,
        body: body,
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            'Basic ' +
            new Buffer(config.MARKETPLACE_ID + ':' + config.SECRET).toString(
              'base64'
            )
        }
      };
    } else {
      return {
        url:
          'https://' +
          config.HOST_URL +
          ':' +
          443 +
          '/' +
          config.API_VERSION +
          endPoint,
        method: method,
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            'Basic ' +
            new Buffer(config.MARKETPLACE_ID + ':' + config.SECRET).toString(
              'base64'
            )
        }
      };
    }
  }
};

module.exports = router;
