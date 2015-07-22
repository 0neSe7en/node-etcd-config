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
    if (keys instanceof String) {
      addWatcher(keys);
    }
    else {
      _.forEach(keys, function(key) {
        addWatcher(key);
      })
    }
  };

  function addWatchers(keys) {
    if (keys instanceof String) {
      addWatcher(keys)
    } else if (keys instanceof Array) {
      _.forEach(keys, addWatchers);
    } else {
      watchValues[]
    }
  }

  function addWatcher(key) {
    var watcher = etcd.watcher(key);
    watchValues[key] = that.get(key);
    watcher.on('change', function(req) {
      watchValues[key] = req.node.value;
    });
    watchers.push(watcher);
  }
}


module.exports = EtcdConfig;

var obj = [
  'haha',
  {strategy: ['minLength', 'freqThreshold']},
  {
    another: [
        'something',
      {other: ['anything']}
    ]
  }
];