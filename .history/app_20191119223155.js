const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');

const app = express();

app.use(bodyParser.json());

app.use(
  '/api',
  graphqlHttp({
    schema: buildSchema(`
        type RootQuery {
            annonces: [String!]!
        }
        type RootMutation {
            createAnnonce(name: String): String
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