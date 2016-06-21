var EVENTS = require('events');
var eventHandler = require('eventHandler');

/**
 * Garbage collector.
 *
 * @type {{}}
 */
module.exports = {

    /**
     * Run the garbage collection.
     *
     * @return {boolean} True on success, false if the garbage collection was cancelled.
     */
    gc: function() {
        // Fire the garbage collection event, cancel if the event was cancelled
        if(eventHandler.fire(EVENTS.EVENT_GC) === false)
            return false;

        // Forget dead creeps
        this.gcDeadCreeps();

        // Return the result
        return true;
    },

    /**
     * Garbage collect the memory of dead creeps.
     */
    gcDeadCreeps: function() {
        // Clear the memory for dead creeps
        for(var creepName in Memory.creeps)
            if(!Game.creeps[creepName])
                delete Memory.creeps[creepName];
    }
};