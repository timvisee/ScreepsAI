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

    // Set the action type
    this._type = instance._type;
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
    action.tick();
};

// Export the Action object
module.exports = Action;