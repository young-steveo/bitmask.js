/**
 * bitmask v0.0.1 - 2013-02-05
 * Quick and painless bitmasks for controlling application state.
 *
 * Copyright (c) 2013 Stephen Young <young.steveo@gmail.com>
 * Licensed MIT
 */
;(function(undefined){
    "use strict";
    var Bitmask, tags, index, slice, pow;

    index = 0;
    tags = {};
    slice = Array.prototype.slice;
    pow = Math.pow;

    /**
     * [Bitmask description]
     */
    Bitmask = function(){};

    /**
     * [set description]
     */
    Bitmask.prototype.set = function(){};
    Bitmask.prototype.all = function(){};
    Bitmask.prototype.any = function(){};
    Bitmask.prototype.get = function(){};
    Bitmask.prototype.inspect = function(){};
    if (typeof exports !== 'undefined' && typeof module !== 'undefined' && module.exports) {
        exports = module.exports = Bitmask;
    } else {
        this.Bitmask = Bitmask;
    }
}).call(this);