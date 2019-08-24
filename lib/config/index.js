const env = process.env.NODE_ENV || 'development';
const settings = require('./' + env); // eslint-disable-line import/no-dynamic-require
settings.port = process.env.PORT || settings.port;
settings.env = env;

module.exports = settings;
