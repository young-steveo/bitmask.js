(function(describe, it, expect, Bitmask, undefined) {
    "use strict";
    describe('Bitmask', function() {
        describe('set', function() {
            it('takes any number of strings as tags', function() {
                var mask, list;

                mask = new Bitmask();
                mask.set('one', 'two', 'three');
                list = mask.inspect();
                expect(list.one).toBeDefined();
                expect(list.two).toBeDefined();
                expect(list.three).toBeDefined();
            });
        });
        describe('all', function() {
            it('returns a boolean', function() {
                var mask;

                mask = new Bitmask();
                mask.set('one', 'three');
                expect(mask.all('one')).toBe(true);
            });
            it('can take an array', function() {
                var mask;

                mask = new Bitmask();
                mask.set('one', 'three');
                expect(mask.all(['one'])).toBe(true);
            });
            it('accepts two params that match and returns true', function() {
                var mask;

                mask = new Bitmask();
                mask.set('one', 'three');
                expect(mask.all('one', 'three')).toBe(true);
            });
            it('accepts two tags in an array that match and returns true', function() {
                var mask;

                mask = new Bitmask();
                mask.set('one', 'three');
                expect(mask.all(['one', 'three'])).toBe(true);
            });
            it('accepts two params that do not all match and returns false', function() {
                var mask;

                mask = new Bitmask();
                mask.set('one', 'three');
                expect(mask.all('one', 'two')).toBe(false);
            });
            it('accepts two tags in an array that do not all match and returns false', function() {
                var mask;

                mask = new Bitmask();
                mask.set('one', 'three');
                expect(mask.all(['one', 'two'])).toBe(false);
            });
        });
    });
}(describe, it, expect, Bitmask));