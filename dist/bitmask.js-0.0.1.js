/**
 * bitmask.js v0.0.1 - 2013-02-05
 * Quick and painless bitmasks for controlling application state.
 *
 * Copyright (c) 2013 Stephen Young <young.steveo@gmail.com>
 * Licensed MIT
 */
;(function(undefined){
    "use strict";
    var Bitmask, tags;

    tags = {};
    Bitmask = function(){};
    Bitmask.prototype.set = function(){};
    Bitmask.prototype.isset = function(){};
    Bitmask.prototype.inspect = function(){};
    if (typeof exports !== 'undefined' && typeof module !== 'undefined' && module.exports) {
        exports = module.exports = Bitmask;
    } else {
        this.Bitmask = Bitmask;
    }
}).call(this);