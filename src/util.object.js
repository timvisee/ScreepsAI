/**
 * Object utilities.
 *
 * @type {{isObject: module.export.isObject}}
 */
module.export = {
    
    /**
     * Check whether the given object is empty. ({})
     *
     * @param {*} object Object to test.
     *
     * @returns {boolean} True if the object is empty, false if not. If a non-object is given, false is returned.
     */
    isObject: function(object) {
        return Object.keys(object).length === 0 && object.constructor === Object;
    }
};
