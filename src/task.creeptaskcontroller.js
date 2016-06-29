var Task = require('task.task');

/**
 * Creep task controller constructor.
 *
 * @param {Creep} creep Creep instance.
 *
 * @constructor
 */
var CreepTaskController = function(creep) {
    // Set the creep instance
    this._creep = creep;

    // Create a list of empty tasks in the creep if a list doesn't currently exists
    if(!creep.memory.hasOwnProperty('tasks'))
        creep.memory.tasks = [];

    // Do some parsing, but only if at least one task is available
    if(!this.hasTasks())
        return;

    // Everything is all right if the tasks are an instance of the task object
    if(this._creep.memory.tasks[0] instanceof Task)
        return;

    // Parse each task, and make it a Task instance
    for(var i = 0, taskCount = this._creep.memory.tasks.length; i < taskCount; i++)
        this._creep.memory.tasks[i] = new Task(this._creep.memory.tasks[i]);
};

/**
 * Get the creep.
 *
 * @returns {Creep} Creep.
 */
CreepTaskController.prototype.getCreep = function() {
    return this._creep;
};

/**
 * Get the task that is currently active.
 *
 * @returns {Task|null} The task that is currently active, or null if there is no active task.
 */
CreepTaskController.prototype.getTask = function() {
    return this._creep.memory.tasks[0] || null;
};

/**
 * Get the list of tasks
 *
 * @returns {Array}
 */
CreepTaskController.prototype.getTasks = function() {
    return this._creep.memory.tasks;
};

/**
 * Check whether there are any tasks.
 *
 * @returns {boolean} True if there are any tasks, false if not.
 */
CreepTaskController.prototype.hasTasks = function() {
    return this._creep.memory.tasks.length > 0;
};

/**
 * Return the number of tasks.
 *
 * @returns {Number} Number of tasks.
 */
CreepTaskController.prototype.getTaskCount = function() {
    return this._creep.memory.tasks.length;
};

/**
 * Add a new task.
 * This won't immediately set the task as currently active if there already is a task that is active.
 * Instead, the task is added to the end of a queue.
 *
 * @param {Task} task Task to add.
 */
CreepTaskController.prototype.addTask = function(task) {
    this._creep.memory.tasks.push(task);
};

/**
 * Add a list of tasks.
 * The tasks won't immediately be assigned as current if there already is a current task.
 *
 * @param {Array} tasks Array of tasks.
 */
CreepTaskController.prototype.addTasks = function(tasks) {
    for(var i = 0, tasksCount = tasks.length; i < tasksCount; i++)
        this.addTask(tasks[i]);
};

/**
 * Add a task, and set it as current.
 *
 * @param {task} task Task to add as current.
 * @param {boolean} [overwrite] True to overwrite the current task, false to shift the current task one position to
 * use it again after the given task completes. Defaults to false.
 */
CreepTaskController.prototype.addTaskCurrent = function(task, overwrite) {
    // Parse the overwrite parameter
    if(overwrite === undefined)
        overwrite = false;

    // Set or shift the current task
    if(overwrite)
        this._creep.memory.tasks[0] = task;
    else
        this._creep.memory.tasks.unshift(task);
};

/**
 * Remove the task at the given index.
 *
 * @param {Number} i Task index.
 */
CreepTaskController.prototype.removeTask = function(i) {
    this._creep.memory.tasks.splice(i, 1);
};

/**
 * Clear the list of tasks that are currently assigned.
 * This won't complete the task, they are simply removed.
 */
CreepTaskController.prototype.removeAllTasks = function() {
    this._creep.memory.tasks = [];
};

/**
 * Complete the current task and move to the next one.
 *
 * @returns {Task|null} Next task that will be assigned as current or null if there is no next task.
 */
CreepTaskController.prototype.completeTask = function() {
    // TODO: Call the complete callback on the task.

    // Remove the first task in the array, to complete it
    this._creep.memory.tasks.shift();

    // Return the current task
    return this.getTask();
};

/**
 * Called on tick.
 * This also routes the tick call to the assigned task and action.
 */
CreepTaskController.prototype.tick = function() {
    // Get the current assigned task
    var currentTask = this.getTask();

    // Fire the tick on the currently assigned task
    if(currentTask !== null)
        currentTask.tick();
};

// Export the object
module.exports = CreepTaskController;