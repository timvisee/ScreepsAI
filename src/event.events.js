// Variable used to determine event indexes
var i = 0;

/**
 * List of events.
 * @type {*}
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
    EVENT_GC: i++,

    /**
     * Called when a task is started.
     */
    EVENT_TASK_START: i++,

    /**
     * Called when a task is (properly) completed.
     */
    EVENT_TASK_COMPLETE: i++,

    /**
     * Called when an action is started.
     */
    EVENT_ACTION_START: i++,

    /**
     * Called when an action is completed.
     */
    EVENT_ACTION_COMPLETE: i++
};