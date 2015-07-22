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
var mongoUrl = config.get(url);
```

### Autoreload:

```
config.addWatchers(['v1', 'v2']);
config.getWatchers();
// {v1: 'latest value', v2: 'latest value'}
```

## Todo:

- [] Test
- [] can watch an Object, not only array.
