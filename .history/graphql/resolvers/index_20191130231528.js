const annonceResolver = require('./annonce');
const authResolver = require('./auth');
const questionResolver = require('./question');
const reponseResolver = require('./reponse');

const rootResolver = {
  ...annonceResolver,
  ...eventsResolver,
  ...bookingResolver
};

module.exports = rootResolver;