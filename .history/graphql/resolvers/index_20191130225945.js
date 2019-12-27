const bcrypt = require('bcryptjs');

const Annonce = require('../../models/annonce')
const User = require('../../models/user')
const Question = require('../../models/question')
const Reponse = require('../../models/reponse')
const { dateToString } = require('../../helpers/date');


//-----------------------------------------------------
module.exports = {
  createUser: args => {
      return User.findOne({email: args.userInput.email})
      .then(user => {
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
          return { 
              ...result._doc,
              password: null,
              _id: result.id }
      })
      .catch(err => {
          throw err;
      });
  }  
}