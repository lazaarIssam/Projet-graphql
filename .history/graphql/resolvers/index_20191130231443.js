const annonceResolver = require('./annonce');
const authResolver = require('./auth');
const questionResolver = require('./annonce');

const rootResolver = {
  ...authResolver,
  ...eventsResolver,
  ...bookingResolver
};

module.exports = rootResolver;