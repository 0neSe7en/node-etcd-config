# node-etcd-config
a config package based on etcd. It can autoreload the config value via watch.

## Feature:

1. save config on etcd
2. simple `get` method
3. watch etcd changes, then autoreload.

## Usage:

### Initialize:

```
var EtcdConfig = require('node-etcd-config');
var config = new EtcdConfig('127.0.0.1', 4001);
```

### General Usage:

```
var mongoUrl = config.get('url');
```

#### Sub App Name:
 
```
var testConfig = new EtcdConfig('127.0.0.1', '4001', 'test');
var productionConfig = new EtcdConfig('127.0.0.1', '4001', 'production');
var mongoUrl = testConfig('url');
// or...
var config = new EtcdConfig('127.0.0.1', '4001');
var mongoUrl = testConfig('test/url');
```

### Autoreload:

```
config.addWatchers(['v1', 'v2']);
console.log(config.watchValues);
// {v1: 'latest value', v2: 'latest value'}
// whenever you get `watchValues`, they are the latest values.
```

## Todo:

- [] Test
- [] can watch an Object, not only array.
