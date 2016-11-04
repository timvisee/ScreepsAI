/**
 * Array utilities.
 *
 * @type {{isArray: module.export.isArray}}
 */
module.exports = {

    /**
     * Check whether the given is an array.
     *
     * @param {*} arr Value to test.
     *
     * @returns {boolean} True if the given value is an array, false if not.
     */
    isArray: function(arr) {
        return arr instanceof Array;
    }
};
