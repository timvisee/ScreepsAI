var gc = require('gc');

/**
 * Core.
 *
 * @type {{}}
 */
module.exports = {

    /**
     * Called on server tick.
     */
    tick: function() {
        // Garbage collection
        gc.gc();
    }
};