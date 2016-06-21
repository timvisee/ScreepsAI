var EVENTS = require('event.events');
var eventHandler = require('event.handler');

module.exports = {

    /**
     * Get the type of task that is assigned to the given creep.
     *
     * @param creep Creep.
     *
     * @returns {task|null} Assigned task type, or null if no task was assigned.
     */
    getTaskType: function(creep) {
        // Return null if the creep doesn't have a task
        if(!this.hasTask(creep))
            return null;

        // Return the task type
        return creep.memory.task.type;
    },

    /**
     * Check whether a creep has a task assigned.
     *
     * @param creep Creep.
     *
     * @return {boolean} True if this creep has a task, false if not.
     */
    hasTask: function(creep) {
        // Make sure the task key exists
        if(!creep.memory.hasOwnProperty('task'))
            return false;

        // Make sure a task type is defined
        return creep.memory.task.type !== undefined;
    },

    /**
     * Check whether the given creep has any queued task.
     *
     * @param creep Creep to check.
     */
    hasTaskQueued: function(creep) {
        return this.getTaskQueueSize(creep) > 0;
    },

    /**
     * Get the task queue size of the given creep
     *
     * @param creep Creep to check.
     *
     * @return {number} Task queue size.
     */
    getTaskQueueSize: function(creep) {
        // Make sure the task key exists
        if(!creep.memory.hasOwnProperty('task'))
            return 0;

        // Make sure a task type is defined
        return creep.memory.taskQueue.length;
    },

    /**
     * Add a task to the given creep.
     * This will automatically assign the task to the creep if no task is currently assigned.
     * If a task is already assigned, it will be added to the queue.
     *
     * @param creep Creep to assign the task to.
     * @param taskType Task type.
     * @param [data] Task data.
     */
    addTask: function(creep, taskType, data) {
        // Assign the task if none is currently assigned
        if(!this.hasTask(creep))
            this.assignTask(creep, taskType, data);
        else
            this.queueTask(creep, taskType, data);
    },

    /**
     * Assign a task to a creep.
     * This will overwrite the task that is currently assigned.
     *
     * @param creep Creep to assign the task to.
     * @param taskType Task type.
     * @param [data] Task data.
     */
    assignTask: function(creep, taskType, data) {
        // Throw an error if the creep is undefined or invalid
        if(creep === undefined || !(creep instanceof Creep)) {
            console.error('Invalid creep instance.');
            return false;
        }

        // Create a task object
        var newTask = {
            type: taskType
        };

        // Set the task data if defined
        if(data !== undefined)
            newTask.data = data;

        // Fire the task start event
        eventHandler.fire(EVENTS.EVENT_TASK_START, newTask);

        // Store the new task
        creep.task = newTask;
    },

    /**
     * Queue a task for the given creep.
     * This won't automatically assign the task to the creep if no task is currently assigned.
     *
     * @param creep Creep to assign the task to.
     * @param taskType Task type.
     * @param [data] Task data.
     */
    queueTask: function(creep, taskType, data) {
        // Throw an error if the creep is undefined or invalid
        if(creep === undefined || !(creep instanceof Creep)) {
            console.error('Invalid creep instance.');
            return false;
        }

        // Create the task queue key for the creep if it doesn't exist yet
        if(!creep.hasOwnProperty('taskQueue'))
            creep.taskQueue = [];

        // Create a task object
        var task = {
            type: taskType
        };

        // Add the task data if defined
        if(data !== undefined)
            task.data = data;

        // Push the task in the queue array
        creep.taskQueue.push(task);
    },

    /**
     * Assign the next task form the given creeps queue if it has any.
     * This will overwrite any task that is currently assigned and doesn't complete it.
     *
     * @param creep Creep to assign the task for.
     *
     * @return {task|null} The type of the newly assigned task, or null if no task was assigned.
     */
    assignTaskFromQueue: function(creep) {
        // Make sure any task is queued
        if(!this.hasTaskQueued(creep))
            return null;

        // Get the first new task object
        var newTask = creep.memory.taskQueue[0];

        // Assign a new task
        this.assignTask(creep, newTask.type, newTask.data);

        // Return the task type
        return newTask.type;
    },

    /**
     * Complete the task that is currently assigned to the given creep.
     *
     * @param creep Creep to complete the task for.
     *
     * @return {task|null} The task type of the newly assigned task from queue, or null if no new task was queued.
     */
    completeTask: function(creep) {
        // Throw an error if the creep is undefined or invalid
        if(creep === undefined || !(creep instanceof Creep)) {
            console.error('Invalid creep instance.');
            return null;
        }

        // Make sure the creep has a task
        if(this.hasTask(creep)) {
            // Fire the task start event
            eventHandler.fire(EVENTS.EVENT_TASK_COMPLETE, creep.memory.task);

            // Clear the current task
            this.resetTask(creep, false);
        }

        // Reset the current task
        return this.assignTaskFromQueue(creep);
    },

    /**
     * Reset the task for the given creep.
     * This removes the current task from the creep if any is assigned and doesn't handle it as completed.
     * Resetting the task won't automatically assign a queued task, that must be done manually instead.
     *
     * The list of queued tasks for this creep will be reset if {@see resetQueue} is set to {@code true}.
     *
     * @param creep Creep to reset the task for.
     * @param [resetQueue] {boolean} True to reset the task queue for this creep too.
     */
    resetTask: function(creep, resetQueue) {
        // Throw an error if the creep is undefined or invalid
        if(creep === undefined || !(creep instanceof Creep)) {
            console.error('Invalid creep instance.');
            return;
        }

        // Remove the task object from the creep if available
        if(creep.memory.hasOwnProperty('task'))
            delete creep.memory.task;

        // Reset the queue
        if(resetQueue && resetQueue !== undefined)
            this.resetTaskQueue(creep);
    },


    /**
     * Reset the task queue for the given creep.
     * This removes all queued tasks from the creep if any are queued.
     *
     * @param creep The creep to reset the queued tasks for.
     */
    resetTaskQueue: function(creep) {
        // Throw an error if the creep is undefined or invalid
        if(creep === undefined || !(creep instanceof Creep)) {
            console.error('Invalid creep instance.');
            return;
        }

        // Remove the queued task objects from the creep if available
        if(creep.memory.hasOwnProperty('taskQueue'))
            delete creep.memory.taskQueue;
    }
};