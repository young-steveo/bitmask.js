/**
 * bitmask v0.3.0 - 2013-02-18
 * Quick and painless bitmasks for controlling application state.
 *
 * Copyright (c) 2013 Stephen Young <young.steveo@gmail.com>
 * Licensed MIT
 */
;(function(undefined){
    "use strict";
    var Bitmask, tags, indexes, slice, pow, has, register, arrayify, split,
        objProto, objToString, bitProto, namespace;

    indexes = {};
    tags = {};

    pow = Math.pow;
    slice = Array.prototype.slice;

    objProto = Object.prototype;
    objToString = objProto.toString;
    has = objProto.hasOwnProperty;

    namespace = Math.random().toString(36).substr(2);
    /**
     * Constructor.
     */
    Bitmask = function(list){
        this.m = 0;
        if (list) {
            list = arrayify.apply(this, arguments);
            this.set.apply(this, list);
        }
    };

    /**
     * Shorthand for the Bitmask prototype.
     */
    bitProto = Bitmask.prototype;

    /**
     * Takes an array of tags or multiple tags as params and returns a boolean indicating whether
     * all of the tags have been set.
     *
     * All tags must be previously set for this method to return true.
     *
     * @param Array|String [, String...]
     * @return Boolean
     */
    bitProto.all = function() {
        var m;
        m = register.apply(this, arrayify.apply(this, arguments));
        return (m & this.m) === m;
    };

    /**
     * Returns the AND value of the tags checked against this.m
     *
     * @param Array|String [, String...]
     * @return Number
     */
    bitProto.and = function() {
        return register.apply(this, arrayify.apply(this, arguments)) & this.m;
    };

    /**
     * Takes an array of tags (or multiple tags as params) and returns a boolean indicating whether
     * any of the tags have been set.
     *
     * This method will return true if any of the tags have been previously set.
     *
     * @param Array|String [, String...] list
     * @return Boolean
     */
    bitProto.any = function() {
        return (register.apply(this, arrayify.apply(this, arguments)) & this.m) > 0;
    };

    /**
     * Takes an array of objects and returns an array of all objects with a mask defined by `key`
     * that matches this bitmask.
     *
     * Default key is `m` and default matching method is `match`.  Pass in strings to define a
     * different key or Bitmask matching method.
     *
     * @param Array bitMasks
     * @param String method
     * @param String key
     * @return Array
     */
    bitProto.filter = function(bitMasks, method, key) {
        var i, result, m, single, item, all, any;

        // set some defaults
        key = key || 'm';
        all = method === 'all';
        any = method === 'any';
        result = [];
        m = this.m;
        i = bitMasks.length;
        while (i--) {
            single = bitMasks[i];
            item = single[key];
            if (
                item === m || // Match
                (all && ((item & m) === m )) || // All
                (any && ((item & m) > 0)) // Any

            ){
                result.push(single);
            }
        }
        return result;
    };

    /**
     * Bitmask::isset is exactly like Bitmask::all, except it doesn't register new tags in the
     * global list.
     *
     * @param Array|String [, String...] list
     * @return Boolean
     */
    bitProto.isset = function(list) {
        var valid, i, parts, group, tag, m;

        m = this.m;
        list = arrayify.apply(this, arguments);
        i = list.length;
        while(i--){
            parts = split(list[i]);
            group = parts[0];
            tag = parts[1];
            tags[group] = tags[group] || {};
            valid = has.call(tags[group], tag);
            if (!valid) {
                break;
            }
        }
        if (valid) {
            m = register.apply(this, list);
            valid = (m & this.m) === m;
        }
        return valid;
    };

    /**
     * Similar to Bitmask::all, except the params must match the bitmask exactly (all set, and
     * none missing)
     *
     * @return Boolean
     */
    bitProto.match = function() {
        return register.apply(this, arguments) === this.m;
    };

    /**
     * Returns the OR value of the tags checked against this.m
     *
     * @param Array|String [, String...]
     * @return Number
     */
    bitProto.or = function() {
        return register.apply(this, arrayify.apply(this, arguments)) | this.m;
    };

    /**
     * Sets the Bitmask and returns it.
     *
     * Has support for namespacing tags like so: "Number.tag" "Color.red" "Settings.error"
     *
     * When using Namespaced tags, it is not possible to check masks against multiple namespaces
     * at the same time.
     *
     * var bm = new Bitmask();
     * bm.set('A.test');
     * bm.set('B.test');
     *
     *  // wrong - this will give unexpected results
     * bm.all('A.test', 'B.test');
     *
     *
     * @param Array|String [, String ...]
     * @return Number
     */
    bitProto.set = function() {
        return this.m = register.apply(this, arrayify.apply(this, arguments));
    };

    /**
     * Returns the tag mask value for a given tag or set of tags
     *
     * @param String [, String ...]
     * @return Number
     */
    Bitmask.get = function() {
        return register.apply(null, arguments);
    };

    /**
     * Returns a copy of the list (not a reference)
     * @return Object
     */
    Bitmask.inspect = function(){
        var tag, obj;

        obj = {};
        for (tag in tags) {
            if (has.call(tags, tag)) {
                obj[tag] = tags[tag];
            }
        }
        return obj;
    };

    /**
     * Ensures list is an array by wrapping it in one if it is not.
     *
     * @param mixed list
     * @return Array
     */
    arrayify = function(list) {
        return objToString.call(list) === '[object Array]' ? list : slice.call(arguments);
    };

    /**
     * Adds new tags to the list if they are not already present.
     * Returns the tag's value (or a sum of values).
     *
     * @param String tag
     * @return Number
     */
    register = function() {
        var args, i, sum, tag, parts, group;

        sum = 0;
        args = slice.call(arguments);
        i = args.length;
        while(i--) {
            parts = split(args[i]);
            group = parts[0];
            tag = parts[1];
            tags[group] = tags[group] || {};
            indexes[group] = indexes[group] || 0;
            sum += has.call(tags[group], tag) ? tags[group][tag] : (tags[group][tag] = pow(2, indexes[group]++));
        }
        return sum;
    };

    /**
     * Splits a namespaced string into an array
     *
     * @param  String single
     * @return Array
     */
    split = function(single) {
        var raw, group;
        raw = single.split('.', 2);
        group = raw.length === 1 ? namespace : raw[0];
        return [group, raw[1] || raw[0]];
    };
    if (typeof exports !== 'undefined' && typeof module !== 'undefined' && module.exports) {
        exports = module.exports = Bitmask;
    } else {
        this.Bitmask = Bitmask;
    }
}).call(this);