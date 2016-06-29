var EVENTS = require('event.events');
var eventHandler = require('event.handler');
var gc = require('gc');
var sourceController = require('source.controller');

// Event handler test
// TODO: Remove this
eventHandler.listen(EVENTS.EVENT_TICK_END, function() {
    console.log('Used CPU: ' + Game.cpu.getUsed());
});

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

        // Update the source controller
        sourceController.update();

        // Fire the tick end event
        eventHandler.fire(EVENTS.EVENT_TICK_END);
    }
};