/**
 * Event handling system.
 */
module.exports = {

    /**
     * List of registered events.
     */
    _events: [],

    /**
     * Listen for an event.
     *
     * @param eventName Event name or key.
     * @param callback Callback method.
     * @param context Event context.
     */
    listen: function(eventName, callback, context) {
        // Get the event directory for the given event name, or create it if it doesn't exist
        var listeners = this._events[eventName];
        if(!listeners)
            listeners = this._events[eventName] = [];

        // Put the event in the list
        listeners.push({
            method: callback,
            context: (context ? context : {})
        });
    },

    /**
     * Fire an event.
     *
     * @param eventName Event name or key.
     * @param data Event data.
     *
     * @returns {boolean} True on success, false if the event was cancelled.
     * True will also be returned if there were no event listeners called.
     */
    fire: function(eventName, data) {
        // Get the event listeners for the given event
        var listeners = this._events[eventName];

        // Return if no listeners are found
        if(!listeners)
            return true;

        // Call the event listeners
        for(var i = 0, listenerCount = listeners.length; i < listenerCount; ++i) {
            // Get the current event
            var event = listeners[i];

            // Call the event, return false if the event was cancelled
            if(event.method.call(event.context, eventName, data) === false)
                return false;
        }

        // Events not cancelled, return true
        return true;
    }
};