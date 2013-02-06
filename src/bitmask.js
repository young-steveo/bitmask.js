    var Bitmask, tags, index, slice, toString, pow, register;

    index = 0;
    tags = {};
    slice = Array.prototype.slice;
    toString = Object.prototype.toString;
    pow = Math.pow;

    /**
     * [Bitmask description]
     */
    Bitmask = function(){
        this.mask = 0;
    };

    /**
     * Sets the Bitmask and returns it.
     *
     * @param String [, String ...]
     * @return Number
     */
    Bitmask.prototype.set = function() {
        return this.mask = register.apply(this, arguments);
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
    Bitmask.prototype.all = function(list) {
        var count;

        list = toString.call(list) === '[object Array]' ? list : slice.call(arguments);
        count = list.length;

        return (register.apply(this, list) & this.mask).toString(2).replace(/0/g,'').length === count;
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
    Bitmask.prototype.any = function() {

    };

    /**
     * Returns the tag mask value for a given tag or set of tags
     *
     * @param String [, String ...]
     * @return Number
     */
    Bitmask.prototype.get = function() {
        return register.call(this, arguments);
    };

    /**
     * Returns a copy of the list (not a reference)
     * @return Object
     */
    Bitmask.prototype.inspect = function(){
        var tag, obj;

        obj = {};
        for (tag in tags) {
            if (tags.hasOwnProperty(tag)) {
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
        var args, i, sum, tag;

        sum = 0;
        args = slice.call(arguments);
        i = args.length;
        while(i--) {
            tag = args[i];
            sum += typeof tags[tag] === 'undefined' ? ((tags[tag] = pow(2, index++))) : tags[tag];
        }
        return sum;
    };