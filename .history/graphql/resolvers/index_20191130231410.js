const authResolver = require('./auth');
const annonceResolver = require('./annonce');
const bookingResolver = require('./booking');

const rootResolver = {
  ...authResolver,
  ...eventsResolver,
  ...bookingResolver
};

module.exports = rootResolver;