var EVENTS = require('events');
var eventHandler = require('eventHandler');
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
        // Fire the tick start event
        eventHandler.fire(EVENTS.EVENT_TICK_START);

        // Garbage collection
        gc.gc();

        // Fire the tick end event
        eventHandler.fire(EVENTS.EVENT_TICK_START);
    }
};