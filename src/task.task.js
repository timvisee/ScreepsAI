/**
 * Task constructor.
 *
 * @param {Task|{}} instance Task instance, or an object representing a task.
 *
 * @constructor
 */
var Task = function(instance) {
    // Make sure the given instance is an object
    if(!(instance instanceof Object))
        throw new Error('Invalid Task instance given.');

    // Set the task type
    this._type = instance._type;

    // TODO: Properly parse the list of actions.

    // Set the actions
    this._actions = instance._actions || [];
};

/**
 * Get the task type.
 *
 * @returns {Object} Task type object.
 */
Task.prototype.getType = function() {
    return this._type;
};

/**
 * Set the task type.
 *
 * @param {Object} taskType Task type object.
 */
Task.prototype.setType = function(taskType) {
    this._type = taskType;
};

/**
 * Compare a task type of the type of this task.
 * This will compare the ID of both task types.
 *
 * @param {Object} taskType Task type to compare.
 *
 * @returns {boolean} True if both task types compare, false if not.
 */
Task.prototype.isType = function(taskType) {
    // Compare the IDs of both tasks
    return this._type.id == taskType.id;
};

/**
 * Check whether this task has any assigned actions.
 *
 * @returns {boolean} True if any actions are assigned, false if not.
 */
Task.prototype.hasActions = function() {
    return this._actions.length > 0;
};

/**
 * Get the number of actions that are assigned to this task.
 *
 * @returns {Number} Number of actions that are assigned.
 */
Task.prototype.getActionCount = function() {
    return this._actions.length;
};

/**
 * Get the list of actions this task has.
 *
 * @returns {*|Array} List of actions.
 */
Task.prototype.getActions = function() {
    return this._actions;
};

/**
 * Get the action that is currently active in this task.
 *
 * @returns {Action|null} Active action, or null if no actions are assigned.
 */
Task.prototype.getAction = function() {
    return this._actions[0] || null;
};

/**
 * Add an action to the task.
 * This won't immediately assign the action as current action for this task when other actions are still active.
 *
 * @param {Action} action Action to add.
 */
Task.prototype.addAction = function(action) {
    this._actions.push(action);
};

/**
 * Add a list of actions to the task.
 * The actions won't immediately be assigned as current action if the task already has a current task.
 *
 * @param {Array} actions Array of actions.
 */
Task.prototype.addActions = function(actions) {
    // Add each action one by one to the list of actions
    for(var i = 0, actionsCount = actions.length; i < actionsCount; i++)
        this.addAction(actions[i]);
};

/**
 * Add an action to the task, and set it as current action.
 *
 * @param {Action} action Action to add as current.
 * @param {boolean} [overwrite] True to overwrite the current action, false to shift the current action one position to
 * use it again after the given action completes. Defaults to false.
 */
Task.prototype.addActionCurrent = function(action, overwrite) {
    // Parse the overwrite parameter
    if(overwrite === undefined)
        overwrite = false;

    // Set or shift the current action
    if(overwrite)
        this._actions[0] = action;
    else
        this._actions.unshift(action);
};

/**
 * Remove the action at the given index from the task.
 *
 * @param {Number} i Task index.
 */
Task.prototype.removeAction = function(i) {
    this._actions.splice(i, 1);
};

/**
 * Clear the list of actions that are currently assigned to the task.
 * This won't complete the task, they are simply removed from the task.
 */
Task.prototype.removeAllActions = function() {
    this._actions = [];
};

/**
 * Complete the current action and move to the next one.
 *
 * @returns {Action|null} Next action that will be assigned as current or null if there is no next action.
 */
Task.prototype.completeAction = function() {
    // TODO: Call the complete callback on the action.

    // Remove the first action in the array, to complete it
    this._actions.shift();

    // Return the current action
    return this.getAction();
};

/**
 * Called on tick.
 */
Task.prototype.tick = function() { };

// Export the Task object
module.exports = Task;