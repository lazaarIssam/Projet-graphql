const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');

const graphQLSchema = require('./graphql/shema/index');
const graphQLResolvers = require('./graphql/resolvers/index');

const app = express();

app.use(bodyParser.json());

app.use('/api',
  graphqlHttp({
    schema: graphQLSchema,
    rootValue: ,
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

mongoose.connect('mongodb://localhost:27017/ghraph', { useUnifiedTopology: true, useNewUrlParser: true }).then(() => {
    console.log("Connecte !");
            app.listen(3000);
        })
        .catch(err => {
            console.log(err);
  });

//app.listen(3000);