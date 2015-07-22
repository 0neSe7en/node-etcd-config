'use strict';
var Etcd = require('node-etcd');
var _ = require('lodash');


function EtcdConfig() {
  var watchers = [];
  var watchValues = {};
  var etcd = new Etcd(arguments[0], arguments[1], arguments[2]);
  var that = this;
  this.get = function(key) {
    var req = etcd.getSync(key);
    return req.body.node.value;
  };
  this.getWatchers = function() {
    return watchValues;
  };
  this.addWatchers = function(keys) {
    _.forEach(keys, function(k) {
      var watcher = etcd.watcher(k);
      watchValues[k] = that.get(k);
      watcher.on('change', function(req) {
        watchValues[k] = req.node.value;
      });
      watchers.push(watcher);
    });
  }
}

module.exports = EtcdConfig;
