# Bitmask.js

A library for fast and painless bitmasks for javascript projects.

## Example

```javascript
var mask = new Bitmask();

mask.set('log', 'warn');

if (mask.isset('log')){
    console.log('this message will display in the console.');
}

if (mask.isset('error')) {
    console.error('This error message is supressed, because the bitmask did not specify "error"');
}
```