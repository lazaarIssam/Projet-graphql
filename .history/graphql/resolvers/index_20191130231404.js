const authResolver = require('./auth');
const annonceResolver = require('./events');
const bookingResolver = require('./booking');

const rootResolver = {
  ...authResolver,
  ...eventsResolver,
  ...bookingResolver
};

module.exports = rootResolver;