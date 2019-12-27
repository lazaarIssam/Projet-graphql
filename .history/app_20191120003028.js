const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');

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
        return annonces;
      },
      createAnnonce: (args) => {
        const annonce = {
            _id: Math.random().toString(),
            title: args.annonceInput.title,
            typedebien: args.annonceInput.typedebien,
            statusPub: args.annonceInput.statusPub,
            prix: +args.annonceInput.prix,
            date: args.annonceInput.date,
            description: args.annonceInput.description
        }
        annonces.push(annonce);
        return annonce;
      }
    },
    graphiql: true
  })
);

// mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD
//     }cluster0-r1skt.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
//   )
//   .then(() => {
//     app.listen(3000);
//   })
//   .catch(err => {
//     console.log(err);
//   });

mongoose.connect('mongodb://localhost:27017/mydb', { useNewUrlParser: true }).then(() => {
    console.log("Connecte !"));
            app.listen(3000);
        })
        .catch(err => {
            console.log(err);
  });

//app.listen(3000);