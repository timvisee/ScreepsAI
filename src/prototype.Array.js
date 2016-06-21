var arrayUtils = require('util.array');

/**
 * Method to check whether an object is an array.
 *
 * @param arr Possible array object.
 *
 * @returns {boolean}
 */
Array.prototype.isArray = function(arr) {
    return arrayUtils.isArray(arr);
};

/**
 * Push an array of objects in an array.
 *
 * @param arr Array.
 */
Array.prototype.pushAll = function(arr) {
    // Push the object in the array if it's not an array
    if(!arrayUtils.isArray(arr)) {
        this.push(arr);
        return;
    }

    // Store the array instance
    var instance = this;

    // Loop through the array
    arr.forEach(function(item) {
        instance.push(item);
    });
};