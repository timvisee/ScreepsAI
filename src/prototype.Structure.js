/**
 * Check whether the structure can be repaired.
 *
 * @returns {boolean} True if the structure can be repaired, false if not.
 */
Structure.prototype.canRepair = function() {
    return this.hits < this.hitsMax;
};

/**
 * Check whether the structure needs to be repaired.
 *
 * @returns {boolean} True if the structure needs to be repaired, false if not.
 */
Structure.prototype.needsRepair = function() {
    return this.hits < this.hitsMax / 2;
};