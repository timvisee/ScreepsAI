var taskTypes = require('task.type');

const MEMORY_KEY_SOURCES = 'sources';

module.exports = {

    /**
     * Update the source states.
     */
    update: function() {
        // Reset the memory sources object
        Memory[MEMORY_KEY_SOURCES] = {};

        // Reset the state of each source
        for(var room in Game.rooms)
            for (var roomName in Game.rooms)
                Game.rooms[roomName].find(FIND_SOURCES).forEach((source) => {
                    Memory[MEMORY_KEY_SOURCES][source.id] = {
                        currentHarvesters: 0,
                        currentHarvestersTime: 0,
                        enrouteHarvesters: 0,
                        enrouteHarvestersDistance: 0
                    };
                });

        // Loop through all the creeps
        for(var creepName in Game.creeps) {
            // Get the task controller for the current creep
            var taskController = Game.creeps[creepName].getTaskController();

            // Make sure a task is currently assigned
            if(!taskController.hasTasks())
                continue;

            // Make sure this creep has the proper task
            if(!taskController.getTask().isType(taskTypes.TASK_HARVEST_ENERGY))
                continue;

            // TODO: Calculate and append the current/enroute harvester properties for the sources.
        }
    }
};