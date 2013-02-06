(function(describe, it, expect, jasmine, Bitmask, undefined) {
    "use strict";
    describe('Bitmask', function() {
        describe('set', function() {
            it('takes any number of strings as tags', function() {
                var mask, list;

                mask = new Bitmask();
                mask.set('one', 'two', 'three');
                list = Bitmask.inspect();
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

        describe('isset', function() {
            it('is an alias of any', function() {
                var mask;

                mask = new Bitmask();
                mask.set('one', 'three');
                expect(mask.isset('one')).toBe(true);
            });
        });

        describe('any', function(){
            it('returns a boolean', function() {
                var mask;

                mask = new Bitmask();
                mask.set('a', 'b');
                expect(mask.any('a')).toBe(true);
            });
            it('can take an array', function() {
                var mask;

                mask = new Bitmask();
                mask.set('a', 'b');
                expect(mask.any(['a'])).toBe(true);
            });
            it('accepts two params that match and returns true', function() {
                var mask;

                mask = new Bitmask();
                mask.set('a', 'b');
                expect(mask.any('a', 'b')).toBe(true);
            });
            it('accepts two tags in an array that match and returns true', function() {
                var mask;

                mask = new Bitmask();
                mask.set('a', 'b');
                expect(mask.any(['a', 'b'])).toBe(true);
            });
            it('accepts two params that do not all match and returns true', function() {
                var mask;

                mask = new Bitmask();
                mask.set('a', 'b');
                expect(mask.any('a', 'c')).toBe(true);
            });
            it('accepts two tags in an array that do not all match and returns true', function() {
                var mask;

                mask = new Bitmask();
                mask.set('a', 'b');
                expect(mask.any(['a', 'c'])).toBe(true);
            });
        });

        describe('get', function(){
            it('returns a number', function(){
                expect(Bitmask.get('someTag')).toEqual(jasmine.any(Number));
            });
            it('registers tags', function(){
                Bitmask.get('someNewTag');
                expect(Bitmask.inspect().someNewTag).toBeDefined();
            });
        });
    });
}(describe, it, expect, jasmine, Bitmask));