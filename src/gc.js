/**
 * Garbage collector.
 *
 * @type {{}}
 */
module.exports = {

    /**
     * Run the garbage collection.
     */
    gc: function() {
        // Forget dead creeps
        this.gcDeadCreeps();
    },

    /**
     * Garbage collect the memory of dead creeps.
     */
    gcDeadCreeps: function() {
        // Clear the memory for dead creeps
        for(var creepName in Memory.creeps)
            if(!Game.creeps[creepName])
                delete Memory.creeps[creepName];
    }
};