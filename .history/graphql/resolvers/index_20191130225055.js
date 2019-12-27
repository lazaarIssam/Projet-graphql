const bcrypt = require('bcryptjs');

const Annonce = require('../../models/annonce')
const User = require('../../models/user')
const Question = require('../../models/question')
const Reponse = require('../../models/reponse')
const { dateToString } = require('../../helpers/date');


//-----------------------------------------------------
module.exports = {
//-----------------------------------------------------
  questions: () => {
    return Question.find()
    .then(questions =>{
        return questions.map(res => {
            return { 
                ...res._doc,
                _id: res.id,
                creator: user.bind(this, res._doc.creator),
                createdReponses: reponses.bind(this, res._doc.createdReponses)
            }
        });
    }).catch(err => {
        throw err;
    });
  },
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
  },
  //----------------------------------------------------------------
  createQuestion: async args => {
    const fetchedAnnonce = await Annonce.findOne({_id: args.annonceId});
    console.log("id: "+fetchedAnnonce);
    const question = new Question({
      title: args.questionInput.title,
      date: new Date( args.questionInput.date),
      description: args.questionInput.description,
      annonce: fetchedAnnonce,
      creator: '5de165141f63b02e88596745'

    });
    const result = await question.save();
    let createdQuestion =  { 
      ...result._doc,
      _id: result.id,
      creator: user.bind(this, result._doc.creator),
      };
    return User.findById('5de165141f63b02e88596745')
    .then(user => {
        if(!user){
            throw new Error('User existe pas !');
        }
        user.createdQuestions.push(question);
        return user.save();
    }).then(result => {
        //return createdReponse;
        return Annonce.findById(fetchedAnnonce).then(annonce => {
            if(!annonce){
                throw new Error('Annonce existe pas !');
            }
            annonce.createdQuestions.push(question);
            return annonce.save();
        }).then(result => {
            return createdQuestion;
        }).catch(err => {
            console.log('erreur !: '+ err)
        throw err;
        })
    })
    .catch(err => {
        console.log('erreur 22: '+ err)
        throw err;
    });
    },
  createReponse: async args => {
    const fetchedQuestion = await Question.findOne({_id: args.questionId});
    const reponse = new Reponse({
        user: '5de165141f63b02e88596745',
        question: fetchedQuestion,
        message: args.message

    });
    const result = await reponse.save();
    let createdReponse =  { 
        ...result._doc,
        id: result.id,
        user: user.bind(this, result._doc.user ),
        createdAt: dateToString(result._doc.createdAt),
        updatedAt: dateToString(result._doc.updatedAt).toISOString()
      };
    return User.findById('5de165141f63b02e88596745')
    .then(user => {
        if(!user){
            throw new Error('User existe pas !');
        }
        user.createdReponses.push(reponse);
        return user.save();
    }).then(result => {
        //return createdReponse;
        return Question.findById(fetchedQuestion).then(question => {
            if(!question){
                throw new Error('Question existe pas !');
            }
            question.createdReponses.push(reponse);
            return question.save();
        }).then(result => {
            return createdReponse;
        }).catch(err => {
            console.log('erreur !: '+ err)
        throw err;
        })
    })
    .catch(err => {
        console.log('erreur 22: '+ err)
        throw err;
    });
    }   
}