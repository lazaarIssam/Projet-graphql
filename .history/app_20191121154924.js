const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Annonce = require('./models/annonce')
const User = require('./models/user')

const app = express();


app.use(bodyParser.json());

const annonces = annonceIds => {
    return Annonce.find({_id: {$in: annonceIds}})
    .then(annonces => {
        return annonces.map(annonce => {
            return { ...annonce._doc, _id:annonce.id, creator: user.bind(this, annonce.creator) }
        });
    })
    .catch(err => {
        throw err;
    });
}

const user = userId => {
    return User.findById(userId)
    .then(user => {
        return { ...user._doc, _id: user.id, createdAnnonces: annonces.bind(this, user._doc.createdAnnonces)  }
    })
    .catch(err => {
        throw err;
    });
}

app.use('/api',
  graphqlHttp({
    schema: ,
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