# Bitmask.js

A library for fast and painless bitmasks for javascript projects.

## Example

```javascript
var mask = new Bitmask();

/**
 * Bitmask::set can take any string tags you want to use.  It automatically assigns bit values
 * to your tags, so you don't have to worry about it.
 */
mask.set('log', 'warn');

/**
 * Bitmask::all checks the tags to see if all of them have been set.
 */
if (mask.all('log', 'warn', 'widget')){
    console.log('This message is supressed, because the bitmask did not specify "widget"');
}

/**
 * Bitmask::isset is an alias of Bitmask::all
 */
if (mask.isset('log')){
    console.log('this message will display in the console.');
}

if (mask.isset('error')) {
    console.error('This message is supressed, because the bitmask did not specify "error"');
}

/**
 * Bitmask::any will return true if any of the tags have been set.
 */
if (mask.any('bingo', 'starlight', 'warn', 'thingie')) {
    console.log('this message will display in the console because "warn" was set.');
}
```