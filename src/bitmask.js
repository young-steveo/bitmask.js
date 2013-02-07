    var Bitmask, tags, indexes, slice, pow, has, register, arrayify, split, strip, filters,
        objProto, objToString, countBits, bitProto, namespace;

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
     * @param String [, String ...]
     * @return Number
     */
    bitProto.set = function() {
        return this.m = register.apply(this, arguments);
    };

    /**
     * Takes an array of tags or multiple tags as params and returns a boolean indicating whether
     * all of the tags have been set.
     *
     * All tags must be previously set for this method to return true.
     *
     * @param Array|String [, String...] list
     * @return Boolean
     */
    bitProto.all = function(list) {
        var count;

        list = arrayify.apply(this, arguments);
        count = list.length;
        return countBits.call(this, list) === count;
    };

    /**
     * Bitmask::isset is exactly like Bitmask::all, except it doesn't register new tags in the
     * global list.
     *
     * @param Array|String [, String...] list
     * @return Boolean
     */
    bitProto.isset = function(list) {
        var count, valid, i, parts, group, tag;

        list = arrayify.apply(this, arguments);
        i = count = list.length;
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
        return valid ? (countBits.call(this, list) === count) : false;
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
     * Takes an array of tags (or multiple tags as params) and returns a boolean indicating whether
     * any of the tags have been set.
     *
     * This method will return true if any of the tags have been previously set.
     *
     * @param Array|String [, String...] list
     * @return Boolean
     */
    bitProto.any = function() {
        return !!countBits.call(this, arrayify.apply(this, arguments));
    };

    /**
     * Takes an array of objects and returns an array of all objects with a mask defined by `key`
     * that matches this bitmask.
     *
     * Default key is `m` and default matching method is `all`.  Pass in strings to define a
     * different key or Bitmask matching method.
     *
     * @param Array bitMasks
     * @param String method
     * @param String key
     * @return Array
     */
    bitProto.filter = function(bitMasks, method, key) {
        var i, result, m, count, single;

        // set some defaults
        bitMasks = bitMasks || [];
        key = key || 'm';
        method = method || 'all';
        result = [];
        m = this.m;
        i = bitMasks.length;

        count = strip(this.m.toString(2));
        method = filters[method];
        while (i--) {
            single = bitMasks[i];
            if (method.call(this, single[key], count)){
                result.push(single);
            }
        }
        return result;
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
     * Some common internal logic
     */
    arrayify = function(list) {
        return objToString.call(list) === '[object Array]' ? list : slice.call(arguments);
    };

    /**
     * counts bits after registering any unregistered tags
     *
     * @param Array list
     * @return Number
     */
    countBits = function(list) {
        return strip((register.apply(this, list) & this.m).toString(2));
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

    /**
     * Takes a binary number represented as a string and strips the 0's, returning the length of
     * the resulting string
     *
     * @param String binary
     * @return Number
     */
    strip = function(binary){
        return binary.replace(/0/g, '').length;
    };

    /**
     * Similar to the above Bitmask methods, only these methods take a mask value rather than tags.
     *
     * @param Number value
     * @return Boolean
     */
    filters = {
        all : function(value, count) {
            return strip((value & this.m).toString(2)) === count;
        },

        any : function(value) {
            return strip((value & this.m).toString(2)) > 0;
        },
        match : function(value) {
            return value === this.m;
        }
    };