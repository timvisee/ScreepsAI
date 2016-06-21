var core = require('core');

module.exports.loop = function () {
    // Fire the tick event in the core
    core.tick();
};