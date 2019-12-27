const annonceResolver = require('./annonce');
const authResolver = require('./auth');

const rootResolver = {
  ...authResolver,
  ...eventsResolver,
  ...bookingResolver
};

module.exports = rootResolver;