# Bitmask.js

Fast and painless bitmasks for javascript projects.

1. [Development](https://github.com/young-steveo/bitmask.js/blob/0.3.0/dist/bitmask-0.3.0.js) **v0.3.0**
2. [Production](https://github.com/young-steveo/bitmask.js/blob/0.3.0/dist/bitmask-0.3.0.min.js) **v0.3.0**

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

#### Performance
Here are some [jsPerf tests](http://jsperf.com/bitmask-js/5) demonstrating Bitmask.js v.s. some
simple `for` loops.

### Namespacing
Bitwise operations are limited to 32 bits in Javascript.  If you want to work with a large set of
tags, you can group them into sets `<= 31` total tags using namespaces.
```javascript

// example of a failure
var mask = new Bitmask();
var tags = [];
var i = 32;
while (i--) {
    tags.push('tag' + i);
}
mask.set(set);

if (mask.isset('tag31')){
    console.log('This does not print because bitwise operations get funny at the 32 bit threshold.');
}

// namespaces
tags = [];  // reset array
i = 31;     // reset i
while (i--) {
    tags.push('namespace.tag' + i);
}
mask.set(set);

if (mask.isset('namespace.tag30')){
    console.log('This prints as expected, since the namespace only contains 31 bits.');
}
```
Namespaces are shared between multiple Bitmask.js objects.

### AND, OR, GET
If you want to perform your own bitwise operations with the tag values, Bitmask.js has you covered.
```javascript
var mask = new Bitmask('one', 'two');

/**
 * The GET method is static and belongs to the Bitmask global object.  It will give you the value
 * of tags stored internally
 */
var one = Bitmask.get('one');
var oneTwo = Bitmask.get('one', 'two');

if (mask.and('one') === (one & oneTwo)){
    console.log('The AND method returns the value of the params AND the internal mask.');
}
```
You can use `mask.or()` similarly.