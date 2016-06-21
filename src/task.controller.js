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
        // Throw an error if the creep is undefined or invalid
        if(creep === undefined || !(creep instanceof Creep)) {
            console.error('Invalid creep instance.');
            return false;
        }

        // Make sure the task key exists
        if(!creep.memory.hasOwnProperty('task'))
            return false;

        // Make sure a task type is defined
        return creep.memory.task.type !== undefined;
    }
};