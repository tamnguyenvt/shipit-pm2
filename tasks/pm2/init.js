var utils = require('shipit-utils');
var path = require('path');
var pathIsAbsolute = require('path-is-absolute');

/**
 * Init task.
 * - Emit pm2_inited event.
 */
module.exports = function (gruntOrShipit) {
  utils.registerTask(gruntOrShipit, 'pm2:init', task);

  function task() {

    /**
    * Create pm2 object for options
    */
    var shipit = utils.getShipit(gruntOrShipit);

    shipit.config = shipit.config || {};
    shipit.currentPath = shipit.config.deployTo ? path.join(shipit.config.deployTo, 'current') : undefined;
    shipit.config.pm2 = shipit.config.pm2 || {};
    shipit.config.pm2.json = shipit.config.pm2.json || 'app.json'; //app.json could be included in your apps repo.
    //shipit.config.pm2.remote  //Not an option, should always run on remote.
    shipit.sharedPath = shipit.sharedPath || 'shared';

    // Allow for an absolute path
    if (!pathIsAbsolute(shipit.sharedPath)) {
      shipit.sharedPath = path.join(shipit.config.deployTo, shipit.sharedPath);
    }

    /*Idea for multi process apps
    shipit.config.pm2.processes = shipit.config.pm2.processes || []; // String or Array of names of the processes to update interpreter on.
    */

    shipit.pm2_inited = true;
    shipit.emit('pm2_inited');

  }
};
