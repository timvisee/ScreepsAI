// Variable used to determine event indexes
var i = 0;

/**
 * List of events.
 * @type {{EVENT_TICK_START: number, EVENT_TICK_END: number}}
 */
module.exports = {

    /**
     * Called when the tick starts.
     */
    EVENT_TICK_START: i++,

    /**
     * Called when the tick ends.
     */
    EVENT_TICK_END: i++,

    /**
     * Called before garbage collection.
     * The garbage collection will be cancelled if the event is cancelled.
     */
    EVENT_GC: i++
};