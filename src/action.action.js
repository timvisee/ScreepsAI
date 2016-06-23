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
Task.prototype.isType = function(actionType) {
    // Compare the IDs of both actions
    return this._type.id == actionType.id;
};

// Export the Action object
module.exports = Action;