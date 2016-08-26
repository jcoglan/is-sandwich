'use strict';

var crypto = require('crypto'),
    http   = require('http'),
    https  = require('https'),
    qs     = require('querystring'),
    url    = require('url');

function get(uri, params, callback) {
  uri = url.parse(uri);

  var client = (uri.protocol === 'https:') ? https : http,
      query  = qs.stringify(params);

  var request = client.request({
    method: 'GET',
    host:   uri.hostname,
    port:   uri.port || (client === https ? 443 : 80),
    path:   uri.path + (query ? '?' + query : '')
  });

  request.on('response', function(response) {
    var status   = response.statusCode,
        redirect = response.headers.location;

    if (status >= 300 && status < 400 && redirect)
      return get(redirect, {}, callback);

    var body = '';
    response.setEncoding('utf8');
    response.on('data', function(c) { body += c });

    response.on('end', function() {
      callback(null, body);
    });
  });

  request.on('error', callback);
  request.end();
};

module.exports = function(thing, callback) {
  var query = 'is ' + thing + ' a sandwich?';

  get('https://www.google.com/search', {q: query}, function(error, response) {
    if (error) return callback(error);

    var key  = process.env.HOME + process.env.LOGNAME,
        hmac = crypto.createHmac('sha256', key);

    hmac.update(response);

    var num = hmac.digest().readUInt32BE(0);
    callback(null, num % 7 === 0);
  });
};
