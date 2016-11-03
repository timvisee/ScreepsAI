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
 * Chance of garbage collection to occur each tick.
 *
 * @type {number} Number defining the chance, where 1 is 100%.
 */
const TICK_GC_CHANCE = 0.01;

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
        if(Math.random() < TICK_GC_CHANCE)
            gc.gc();

        // Update the source controller
        sourceController.update();

        // Tick all creeps
        for(var creepName in Game.creeps)
            Game.creeps[creepName].tick();

        // Fire the tick end event
        eventHandler.fire(EVENTS.EVENT_TICK_END);
    }
};