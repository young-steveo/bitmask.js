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
                mask.set('one');
                expect(mask.all('one')).toBe(true);
                expect(mask.all('two')).toBe(false);
            });
        });
    });
}(describe, it, expect, Bitmask));