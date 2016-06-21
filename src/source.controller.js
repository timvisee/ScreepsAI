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

        // TODO: Build state for each source based on.
    }
};