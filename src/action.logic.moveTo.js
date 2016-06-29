/**
 * Create and export the action.
 *
 * @type {*}
 */
module.export = {

    /**
     * Called on action tick.
     *
     * @param {Action} action Action instance that initiated this tick.
     */
    tick: function(action) {
        // Check whether the action is completed, print the result
        console.log('Action state: ' + (action.isCompleted() ? 'Completed!' : 'Not completed!'));
    }
};