var path = require('path');
var nconf = require('nconf');
var localConfigPath = path.resolve(__dirname, '..', 'local.config.json');

// Environment variables supercede all other config options
nconf.argv().env();

// Add local.config.json to the project root to override defaults
nconf.file({ file: localConfigPath });

// Usage: config.get('PLATFORM_HTTPS');
nconf.defaults({
    "PORT"              : 8080
});

module.exports = nconf;
