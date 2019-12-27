const annonceResolver = require('./annonce');
const authResolver = require('./auth');
const questionResolver = require('./question');
const reponseResolver = require('./reponse');

const rootResolver = {
  ...annonceResolver,
  ...authResolver,
  ...questionResolver,
  ...reponseResolver
};

module.exports = rootResolver;