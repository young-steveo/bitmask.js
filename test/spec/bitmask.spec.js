(function(describe, it, expect, jasmine, Bitmask, undefined) {
    "use strict";
    describe('Bitmask', function() {
        describe('set', function() {
            it('takes any number of strings as tags', function() {
                var mask, list;

                mask = new Bitmask();
                mask.set('one', 'two', 'three');
                list = Bitmask.inspect();

                list = list[Object.keys(list)[0]];
                expect(list.one).toBeDefined();
                expect(list.two).toBeDefined();
                expect(list.three).toBeDefined();
            });
        });

        describe('constructor', function() {
            it('starts with an empty bitmask', function() {
                var mask = new Bitmask();
                expect(mask.m).toBe(0);
            });
            it('calls set', function() {
                var mask, list;
                mask = new Bitmask('one');
                list = Bitmask.inspect();
                list = list[Object.keys(list)[0]];
                expect(list.one).toBeDefined();
            });
            it('calls set with an array', function() {
                var mask, list;
                mask = new Bitmask(['one']);
                list = Bitmask.inspect();
                list = list[Object.keys(list)[0]];
                expect(list.one).toBeDefined();
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
            it('must match all', function() {
                var mask;

                mask = new Bitmask();
                mask.set('one', 'three');
                expect(mask.all('one', 'three', 'nine')).toBe(false);
            });
        });

        describe('isset', function() {
            it('is an alias of any', function() {
                var mask;

                mask = new Bitmask();
                mask.set('one', 'three');
                expect(mask.isset('one')).toBe(true);
            });
            it('Does not register new tags', function() {
                var mask, list;

                mask = new Bitmask();
                mask.set('one', 'three');
                mask.isset('fourtyFour');

                list = Bitmask.inspect();
                list = list[Object.keys(list)[0]];
                expect(list.fourtyFour).toBeUndefined();
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
                var list;
                Bitmask.get('someNewTag');
                list = Bitmask.inspect();
                list = list[Object.keys(list)[0]];
                expect(list.someNewTag).toBeDefined();
            });
        });

        describe('match', function(){
            it('must match mask exactly', function(){
                var mask;

                mask = new Bitmask('four', 'three', 'two');
                expect(mask.match('three', 'two', 'four')).toBe(true);
                expect(mask.match('two', 'four')).toBe(false);
            });
        });

        describe('filter', function(){
            it('can filter multiple bitmasks', function(){
                var primary, masks;

                masks = [
                    new Bitmask('one'),
                    new Bitmask('one', 'two'),
                    new Bitmask('three'),
                    new Bitmask('two', 'three'),
                    new Bitmask('four', 'one')
                ];
                primary = new Bitmask('one');
                expect(primary.filter(masks).length).toBe(1);
            });

            it('can use a custom key', function(){
                var primary, masks;

                masks = [
                    { someKey : new Bitmask('one').m },
                    { someKey : new Bitmask('one', 'two').m },
                    { someKey : new Bitmask('three').m },
                    { someKey : new Bitmask('two', 'three').m },
                    { someKey : new Bitmask('four', 'one').m }
                ];
                primary = new Bitmask('one');
                expect(primary.filter(masks, 'all', 'someKey').length).toBe(3);
            });

            it('can use different filtering methods', function(){
                var primary, masks;

                masks = [
                    new Bitmask('one'),
                    new Bitmask('one', 'two'),
                    new Bitmask('three'),
                    new Bitmask('two', 'three'),
                    new Bitmask('four', 'one', 'two')
                ];
                primary = new Bitmask('one', 'two');
                expect(primary.filter(masks, 'all').length).toBe(2);
                expect(primary.filter(masks, 'any').length).toBe(4);
                expect(primary.filter(masks, 'match').length).toBe(1);
            });
        });
        describe('namespaces', function(){
            it('works like normal tags', function(){
                var mask;
                mask = new Bitmask('foo.x', 'foo.y', 'foo.z');
                expect(mask.isset('foo.x')).toBe(true);
            });
            it('works with 31 bits', function(){
                var mask, i, set;

                mask = new Bitmask();
                set = [];
                i = 31;
                while (i--) {
                    set.push('bar.tag' + i);
                }
                mask.set(set);
                expect(mask.isset('bar.tag30')).toBe(true);
            });
            it('gives unexpected results if 32 or more bits are used', function(){
                var mask, i, set;

                mask = new Bitmask();
                set = [];
                i = 32;
                while (i--) {
                    set.push('baz.tag' + i);
                }
                mask.set(set);
                expect(mask.isset('baz.tag31')).toBe(false);
            });
        });
        describe('bitwise methods', function(){
            it('exposes an AND operation', function(){
                var mask, a, ab;

                mask = new Bitmask('a', 'b');
                a = Bitmask.get('a');
                ab = Bitmask.get('a', 'b');
                expect(a & ab).toBe(mask.and('a'));
            });
            it('exposes an OR operation', function(){
                var mask, a, bc;

                mask = new Bitmask('b', 'c');
                a = Bitmask.get('a');
                bc = Bitmask.get('b', 'c');
                expect(a | bc).toBe(mask.or('a'));
            });
        });
    });
}(describe, it, expect, jasmine, Bitmask));