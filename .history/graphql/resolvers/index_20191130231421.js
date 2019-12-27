const annonceResolver = require('./annonce');
const authResolver = require('./auth');
const bookingResolver = require('./booking');

const rootResolver = {
  ...authResolver,
  ...eventsResolver,
  ...bookingResolver
};

module.exports = rootResolver;