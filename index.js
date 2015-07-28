'use strict';
var Etcd = require('node-etcd');
var _ = require('lodash');

/**
 *
 * @param {String} [host]
 * @param {String} [port]
 * @param {String} [appName] - sub app etcd config.
 * @constructor
 */
function EtcdConfig(host, port, appName) {
  var watchers = [];
  var etcd = new Etcd(host, port, arguments[3], arguments[4]);
  var that = this;

  this.appName = appName;
  this.watchValues = {};
  this.get = function(key, app) {
    if (app) {
      key = app + '/' + key;
    } else if (that.appName) {
      key = that.appName + '/' + key;
    }
    var req = etcd.getSync(key);
    return req.body.node.value;
  };

  this.addWatchers = function(keys) {
    _.forEach(keys, function(k) {
      var watcher = etcd.watcher(k);
      that.watchValues[k] = that.get(k);
      watcher.on('change', function(req) {
        that.watchValues[k] = req.node.value;
      });
      watchers.push(watcher);
    });
  }
}

module.exports = EtcdConfig;