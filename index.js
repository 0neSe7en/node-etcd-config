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
  var etcd;
  if (_.isArray(host)){
    etcd = new Etcd(host, arguments[3], arguments[4]);
  } else {
    etcd = new Etcd(host, port, arguments[3], arguments[4]);
  }
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
    if (req.body.node.dir) {
      var result = {};
      _.forEach(req.body.node.nodes, function(n) {
        if (!n.dir) {
          var subKey = n.key.slice(key.length + 2);
          result[subKey] = n.value;
        }
      });
      return result;
    } else {
      return req.body.node.value;
    }
  };

  this.addWatchers = function(keys) {
    _.forEach(keys, function(k) {
      var watchKey = that.appName ? that.appName + '/' + k : k;
      var watcher = etcd.watcher(watchKey);
      that.watchValues[k] = that.get(k);
      watcher.on('change', function(req) {
        that.watchValues[k] = req.node.value;
      });
      watchers.push(watcher);
    });
  };
}

module.exports = EtcdConfig;
