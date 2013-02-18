# Bitmask.js

Fast and painless bitmasks for javascript projects.

## Bitmask Overview
Bitmasks and bitwise operations are great tools for managing application state or filtering large
lists of data quickly.  However, applying bitmask logic can be pretty daunting if you've had limited
experience working with bitwise operators.

Bitmask.js provides a simple api that gives you the power of bitmasks without all the headaches.
With Bitmask.js you only need to worray about your data.

*Bitmask.js is partially inspired by [bitTags](https://github.com/mexitek/bitTags). bitTags provides
some useful bitwise operations but does not provide all of the functionality that Bitmask.js gives
you*

### Quick Example
Bitmasks are great for defining application state, like log/debugging levels.
```javascript
var debug = new Bitmask('log', 'warn');

if (debug.isset('log')){
    console.log('This message will display in the console.');
}
if (debug.isset('error')) {
    console.error('This message is supressed, because the bitmask did not specify "error"');
}
if (debug.isset('log', 'warn', 'widget')){
    console.log('This message is supressed, because the bitmask did not specify "widget"');
}
if (debug.any('bingo', 'starlight', 'warn', 'thingie')) {
    console.log('this message will display in the console because "warn" was set.');
}
```

### Filtering
Another use case for bitmasks is for filtering data quickly.
```javascript
var list = [
    new Bitmask('red', 'orange', 'yellow'),
    new Bitmask('green', 'blue', 'indigo'),
    new Bitmask('violet'),
    new Bitmask('pink', 'purple', 'red'),
    new Bitmask('green', 'white', 'red')
];

var mask = new Bitmask('red');

// newList will contain an array with three objects
var newList = mask.filter(list, 'any');
```

#### Specifying a Key
Every Bitmask object has an `m` key that can be stored in your own objects so that you can filter
more easily.  As long as the array contains objects with a key that points to this `m` value:

```javascript

// key `tags` in these objects contains the `m` value
var list = [
    { temp : 'hot', tags : new Bitmask('hot', 'red').m },
    { temp : 'cold', tags : new Bitmask('cold', 'blue').m },
    { temp : 'warm', tags : new Bitmask('warm', 'red', 'blue').m }
];

var mask = new Bitmask('blue');

// Notice the key name as the third param.
var newList = mask.filter(list, 'any', 'tags');
```