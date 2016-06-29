var EVENTS = require('events.events');
var eventHandler = require('event.handler');

/**
 * Action constructor.
 *
 * @param {Action|{}} instance Action instance, or an object representing an action.
 *
 * @constructor
 */
var Action = function(instance) {
    // Make sure the given instance is an object
    if(!(instance instanceof Object))
        throw new Error('Invalid Task instance given.');

    // Set the action type and data
    this._type = instance._type;
    this._data = instance._data;

    // Set the completed state
    this._completed = false;
};

/**
 * Get the action type.
 *
 * @returns {Object} Action type object.
 */
Action.prototype.getType = function() {
    return this._type;
};

/**
 * Get the actions logic file.
 *
 * @returns {string} Actions logic file.
 *
 * @private
 */
Action.prototype._getLogicFile = function() {
    return this._type.file;
};

/**
 * Set the action type.
 *
 * @param {Object} actionType Action type object.
 */
Action.prototype.setType = function(actionType) {
    this._type = actionType;
};

/**
 * Compare a action type of the type of this action.
 * This will compare the ID of both action types.
 *
 * @param {Object} actionType Action type to compare.
 *
 * @returns {boolean} True if both action types compare, false if not.
 */
Action.prototype.isType = function(actionType) {
    // Compare the IDs of both actions
    return this._type.id == actionType.id;
};

/**
 * Called on tick.
 */
Action.prototype.tick = function() {
    // Get the action file and make sure it's valid
    var actionFile = this._getLogicFile();
    if(!actionFile)
        throw new Error('Undefined action logic file.');

    // Require the action
    var action = require(this._getLogicFile());

    // Call the tick method on the action logic
    action.tick(this);
};

/**
 * Check whether this action is completed.
 *
 * @returns {boolean} True if the action is completed, false if not.
 */
Action.prototype.isCompleted = function() {
    return this._completed;
};

/**
 * Complete the action.
 *
 * @return {boolean} True if the action is successfully completed, false if the completion was cancelled.
 * True is also returned if the action was already completed.
 */
Action.prototype.complete = function() {
    // Make sure the action isn't completed already
    if(this._completed)
        return true;

    // Call the action complete event
    if(!eventHandler.fire(EVENTS.EVENT_ACTION_COMPLETE, {action: this}))
        return false;

    // Set the completed flag
    this._completed = true;

    // The action is completed, return true
    return true;
};

/**
 * Destroy the action after it has being used.
 * This also destroys the memory used by the action.
 */
Action.prototype.destroy = function() {
    // TODO: Remove all memory used by this action, and remove the whole action entry.
};

// Export the Action object
module.exports = Action;