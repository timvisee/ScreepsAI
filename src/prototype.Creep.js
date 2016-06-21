var taskController = require('task.controller');

/**
 * Get the type of task that is assigned to the given creep.
 *
 * @returns {task|null} Assigned task type, or null if no task was assigned.
 */
Creep.prototype.getTaskType = function() {
    return taskController.getTaskType(this);
};

/**
 * Check whether the creep has a task assigned.
 *
 * @return {boolean} True if this creep has a task, false if not.
 */
Creep.prototype.hasTask = function() {
    return taskController.hasTask(this);
};