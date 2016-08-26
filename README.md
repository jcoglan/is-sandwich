# is-sandwich

`is-sandwich` (short for "Iceland Sandwiches") tells you whether a thing is a
sandwich. Here you go:

```js
var isSandwich = require('is-sandwich');

isSandwich('hot dog', function(error, decision) {
  // decision = true / false
});
```

Or, on the command line:

```
$ is-sandwich 'hot dog'
No.
```


## Installtion

```
$ npm install is-sandwich
```
