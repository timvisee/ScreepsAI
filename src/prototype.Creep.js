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
 * Check whether the task that is assigned to the creep equals the given task type.
 *
 * @param taskType Task type to equal to.
 *
 * @returns {boolean} True if the given task type equals the assigned task type, false if not.
 */
Creep.prototype.isTaskType = function(taskType) {
    return taskController.isTaskType(this, taskType);
};

/**
 * Check whether the creep has a task assigned.
 *
 * @return {boolean} True if this creep has a task, false if not.
 */
Creep.prototype.hasTask = function() {
    return taskController.hasTask(this);
};

/**
 * Check whether the creep has any queued task.
 */
Creep.prototype.hasTaskQueued = function() {
    return taskController.hasTaskQueued(this);
};

/**
 * Get the task queue size of the creep.
 *
 * @return {number} Task queue size.
 */
Creep.prototype.getTaskQueueSize = function() {
    return taskController.getTaskQueueSize(this);
};

/**
 * Add a task to the creep.
 * This will automatically assign the task to the creep if no task is currently assigned.
 * If a task is already assigned, it will be added to the queue.
 *
 * @param taskType Task type.
 * @param [data] Task data.
 */
Creep.prototype.addTask = function(taskType, data) {
    return taskController.addTask(this, taskType, data);
};

/**
 * Assign a task to the creep.
 * This will overwrite the task that is currently assigned.
 *
 * @param taskType Task type.
 * @param [data] Task data.
 */
Creep.prototype.assignTask = function(taskType, data) {
    return taskController.assignTask(this, taskType, data);
};

/**
 * Queue a task for the creep.
 * This won't automatically assign the task to the creep if no task is currently assigned.
 *
 * @param taskType Task type.
 * @param [data] Task data.
 */
Creep.prototype.queueTask = function(taskType, data) {
    return taskController.queueTask(this, taskType, data);
};

/**
 * Assign the next task form the creeps queue if it has any.
 * This will overwrite any task that is currently assigned and doesn't complete it.
 *
 * @return {task|null} The type of the newly assigned task, or null if no task was assigned.
 */
Creep.prototype.assignTaskFromQueue = function() {
    return taskController.assignTaskFromQueue(this);
};

/**
 * Complete the task that is currently assigned to the creep.
 *
 * @return {task|null} The task type of the newly assigned task from queue, or null if no new task was queued.
 */
Creep.prototype.completeTask = function() {
    return taskController.completeTask(this);
};

/**
 * Reset the task for the creep.
 * This removes the current task from the creep if any is assigned and doesn't handle it as completed.
 * Resetting the task won't automatically assign a queued task, that must be done manually instead.
 *
 * The list of queued tasks for this creep will be reset if {@see resetQueue} is set to {@code true}.
 *
 * @param [resetQueue] {boolean} True to reset the task queue for this creep too.
 */
Creep.prototype.resetTask = function(resetQueue) {
    return taskController.resetTask(this, resetQueue);
};


/**
 * Reset the task queue for the creep.
 * This removes all queued tasks from the creep if any are queued.
 */
Creep.prototype.resetTaskQueue = function() {
    return taskController.resetTaskQueue(this);
};