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

        type User {
            _id: ID,
            email: String!
            password: String
        }

        input AnnonceInput {
            title: String!
            typedebien: String!
            statusPub: String!
            prix: Float!
            date: String!
            description: String!
        }

        input UserInput {
            email: String!
            password: String!
        }

        type RootQuery {
            annonces: [Annonce!]!
        }
        type RootMutation {
            createAnnonce(annonceInput: AnnonceInput): Annonce
            createUser(userInput: UserInput): User
        }
        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
        annonces: () => {
        return Annonce.find().then(annonces =>{
            return annonces.map(res => {
                return { ...res._doc, _id: res.id }
            });
        }).catch(err => {
            throw err;
        });
      },
      createAnnonce: (args) => {
        const annonce = new Annonce({
            title: args.annonceInput.title,
            typedebien: args.annonceInput.typedebien,
            statusPub: args.annonceInput.statusPub,
            prix: +args.annonceInput.prix,
            date: new Date( args.annonceInput.date),
            description: args.annonceInput.description
        });
        return annonce.save().then(result =>{
            console.log('result: '+result);
            return { ...result._doc, _id: result.id };
        }).catch(err => {
            console.log('erreur: '+ err)
            throw err;
        });
        return annonce;
      },
      createUser: args => {
          return User.findOne({email: args.userInput.email}).then(user => {
              if(user){
                  throw new Error('User deja existe déja !');
              }
              return bcrypt.hash(args.userInput.password, 12)
          }).then(hashedPassword => {
            const user = new User({
                email: args.userInput.email,
                password: hashedPassword
            });
            return user.save();
          })
          .then(result => {
              return { ...result._doc,password: null, _id: result.id }
          })
          .catch(err => {
              throw err;
          });
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

mongoose.connect('mongodb://localhost:27017/ghraph', { useUnifiedTopology: true, useNewUrlParser: true }).then(() => {
    console.log("Connecte !");
            app.listen(3000);
        })
        .catch(err => {
            console.log(err);
  });

//app.listen(3000);