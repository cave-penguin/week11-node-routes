// Transpile all code following this line with babel and use 'env' (aka ES6) preset.
// eslint-disable-next-line import/no-unresolved
require('@babel/register')()

// eslint-disable-next-line import/extensions
module.exports = require('./server/server.js')
