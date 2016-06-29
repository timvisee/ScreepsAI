var CreepTaskController = require('task.creeptaskcontroller');

/**
 * Task controller instance for the creep.
 *
 * @type {CreepTaskController|null} Creep task controller instance, or null if the instance isn't configured yet.
 *
 * @private
 */
Creep.prototype._taskController = null;

/**
 * Get the task controller for the creep.
 *
 * @returns {CreepTaskController} Task controller for the creep.
 */
Creep.prototype.getTaskController = function() {
    // Return the task controller if it's already instantiated
    if(this._taskController !== undefined && this._taskController !== null)
        return this._taskController;
    
    // Instantiate and return the task controller
    return (this._taskController = new CreepTaskController(this));
};

/**
 * Tick the creep.
 */
Creep.prototype.tick = function() {
    // Fire the tick method on the task controller
    if(this._taskController)
        this._taskController.tick();
    else
        this.getTaskController().tick();
};