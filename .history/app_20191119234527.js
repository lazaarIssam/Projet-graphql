const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');

const app = express();

const annonces = [];

app.use(bodyParser.json());

app.use('/api',
  graphqlHttp({
    schema: buildSchema(`
        type Annonce {
            _id: ID!
            title: String!
            typedebien: String!
            statusPub: String!
            prix: Float!
            date: String!
            description: String!
        }

        input AnnonceInput {
            title: String!
            typedebien: String!
            statusPub: String!
            prix: Float!
            date: String!
            description: String!
        }

        type RootQuery {
            annonces: [Annonce!]!
        }
        type RootMutation {
            createAnnonce(annonceInput: AnnonceInput): Annonce
        }
        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
        annonces: () => {
        return ['Romantic Cooking', 'Sailing', 'All-Night Coding'];
      },
      createAnnonce: (args) => {
        const eventName = args.name;
        return eventName;
      }
    },
    graphiql: true
  })
);

app.listen(3000);