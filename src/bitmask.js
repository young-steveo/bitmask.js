    var Bitmask, tags, indexes, slice, pow, has, register, arrayify,
        objProto, numToString, objToString, countBits, bitProto, namespace;

    indexes = {};
    tags = {};

    pow = Math.pow;
    slice = Array.prototype.slice;
    numToString = Number.prototype.toString;

    objProto = Object.prototype;
    objToString = objProto.toString;
    has = objProto.hasOwnProperty;

    namespace = numToString.call(Math.random(), 36).substr(2);
    /**
     * Constructor.
     */
    Bitmask = function(){
        this.m = 0;
        if (arguments.length){
            this.set.apply(this, arguments);
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
     * Takes an array of tags (or multiple tags as params) and returns a boolean indicating whether
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
        var count, valid, i;

        list = arrayify.apply(this, arguments);
        i = count = list.length;
        while(i--){
            valid = has.call(tags, list[i]);
            if (!valid) {
                break;
            }
        }
        return valid ? countBits.call(this, list) === count : false;
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
     * Default key is `mask` and default matching method is `all`.  Pass in strings to define a
     * different key or Bitmask matching method.
     *
     * @param Array bitMasks
     * @param String key
     * @param String method
     * @return Array
     */
    bitProto.filter = function(bitMasks, key, method) {
        var i, result, m = this.m;

        // set some defaults
        bitMasks = bitMasks || [];
        key = key || 'mask';
        method = method || 'all';
        result = [];

        i = bitMasks.length;
        while (i--) {
            if (bitMasks[i][key] === m){
                result.push(bitMasks[i]);
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
        var args, i, sum, tag, raw, group;

        sum = 0;
        args = slice.call(arguments);
        i = args.length;
        while(i--) {
            raw = args[i].split('.', 2);
            group = raw.length === 1 ? namespace : raw[0];
            tags[group] = tags[group] || {};
            indexes[group] = indexes[group] || 0;
            tag = raw[1] || raw[0];
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

    countBits = function(list) {
        return numToString.call(register.apply(this, list) & this.m, 2).replace(/0/g, '').length;
    };