const mocha = require('mocha');
const it = mocha.it;
const describe = mocha.describe;
const assert = require('chai').assert;

const utilArray = require('../src/util.array');

// util.array module
describe('util.array', function() {
    // isArray function
    describe('isArray', function() {
        // Filled array is array
        it('Object isn\'t array', function() {
            // Create an array
            var arr = [1, 2, 3];

            // Test array
            assert.isTrue(utilArray.isArray(arr));

            // Fill the array with random types
            arr = [1, 2, [], {}];

            // Test array
            assert.isTrue(utilArray.isArray(arr));
        });

        // Empty array is array
        it('Empty array is array', function() {
            // Test array
            assert.isTrue(utilArray.isArray([]));
        });

        // Object isn't array
        it('Object isn\'t array', function() {
            // Test array
            assert.isFalse(utilArray.isArray({}));
        });

        // String isn't array
        it('String isn\'t array', function() {
            // Test array
            assert.isFalse(utilArray.isArray(''));
        });
    });
});
