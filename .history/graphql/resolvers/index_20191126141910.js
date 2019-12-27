const bcrypt = require('bcryptjs');

const Annonce = require('../../models/annonce')
const User = require('../../models/user')
const Question = require('../../models/question')
const Reponse = require('../../models/reponse')

const annonces = annonceIds => {
    return Annonce.find({_id: {$in: annonceIds}})
    .then(annonces => {
        return annonces.map(annonce => {
            return { 
                ...annonce._doc,
                _id:annonce.id,
                date: new Date(annonce._doc.date).toISOString(),
                creator: user.bind(this, annonce.creator) 
            }
        });
    })
    .catch(err => {
        throw err;
    });
}
//-----------------------------------------------------
const reponses = reponseIds => {
    return Reponse.find({_id: {$in: reponseIds}})
    .then(reponses => {
        return reponses.map(reponse => {
            return { 
                ...reponse._doc,
                _id:reponse.id,
                createdAt: new Date(reponse._doc.createdAt).toISOString(),
                updatedAt: new Date(reponse._doc.updatedAt).toISOString(),
                user: user.bind(this, reponse.user) 
            }
        });
    })
    .catch(err => {
        throw err;
    });
}
//-----------------------------------------------------
const questions = questionIds => {
    return Question.find({_id: {$in: questionIds}})
    .then(questions => {
        return questions.map(question => {
            return { 
                ...question._doc,
                _id:question.id,
                createdReponses: reponses.bind(this.question._doc.createdReponses),
                date: new Date(question._doc.date).toISOString(),
                creator: user.bind(this, question.creator) }
        });
    })
    .catch(err => {
        throw err;
    });
}
//-----------------------------------------------------
const user = userId => {
    return User.findById(userId)
    .then(user => {
        return { 
            ...user._doc,
            _id: user.id,
            password: null,
            createdReponses: reponses.bind(this.user._doc.createdReponses),
            createdAnnonces: annonces.bind(this, user._doc.createdAnnonces),
            createdQuestions: questions.bind(this, user._doc.createdQuestions)
        }
    })
    .catch(err => {
        throw err;
    });
}

//-----------------------------------------------------
module.exports = {
    annonces: () => {
    return Annonce.find()
    .then(annonces =>{
        return annonces.map(res => {
            return { 
                ...res._doc,
                _id: res.id,
                creator: user.bind(this, res._doc.creator)
            }
        });
    }).catch(err => {
        throw err;
    });
  },
//-----------------------------------------------------
  questions: () => {
    return Question.find()
    .then(questions =>{
        return questions.map(res => {
            return { 
                ...res._doc,
                _id: res.id,
                creator: user.bind(this, res._doc.creator)
            }
        });
    }).catch(err => {
        throw err;
    });
  },
 //-----------------------------------------------------
  createAnnonce: (args) => {
    const annonce = new Annonce({
        title: args.annonceInput.title,
        typedebien: args.annonceInput.typedebien,
        statusPub: args.annonceInput.statusPub,
        prix: +args.annonceInput.prix,
        date: new Date( args.annonceInput.date),
        description: args.annonceInput.description,
        creator: '5ddd20aabd9d483c84b57a85'
    });
    let createdAnnonce;
    return annonce
    .save()
    .then(result =>{
        createdAnnonce = { 
            ...result._doc,
            _id: result.id,
            creator: user.bind(this, result._doc.creator)
        };
       return User.findById('5ddd20aabd9d483c84b57a85')
    }).then(user => {
        if(!user){
            throw new Error('User existe pas !');
        }
        user.createdAnnonces.push(annonce);
        return user.save();
    }).then(result => {
        return createdAnnonce;
    })
    .catch(err => {
        console.log('erreur: '+ err)
        throw err;
    });
    return annonce;
  },
 //-----------------------------------------------------
  createQuestion: (args) => {
    const question = new Question({
        title: args.questionInput.title,
        date: new Date( args.questionInput.date),
        description: args.questionInput.description,
        creator: '5ddd20aabd9d483c84b57a85'
    });
    let createdQuestion;
    return question
    .save()
    .then(result =>{
        createdQuestion = { 
            ...result._doc,
            _id: result.id,
            creator: user.bind(this, result._doc.creator)
        };
       return User.findById('5ddd20aabd9d483c84b57a85')
        
    }).then(user => {
        if(!user){
            throw new Error('User existe pas !');
        }
        user.createdQuestions.push(question);
        return user.save();
    }).then(result => {
        return createdQuestion;
    })
    .catch(err => {
        console.log('erreur: '+ err)
        throw err;
    });
    return question;
  },
//-----------------------------------------------------
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
  reponseQuestion: (args) => {
    const fetchedQuestion = Question.findOne({_id: args.questionId});
    const reponse = new Reponse({
        user: '5ddd20aabd9d483c84b57a85',
          question: fetchedQuestion,
          message: args.message
    });
    let createdQuestion;
    return question
    .save()
    .then(result =>{
        createdQuestion = { 
            ...result._doc,
            _id: result.id,
            creator: user.bind(this, result._doc.creator)
        };
       return User.findById('5ddd20aabd9d483c84b57a85')
        
    }).then(user => {
        if(!user){
            throw new Error('User existe pas !');
        }
        user.createdQuestions.push(question);
        return user.save();
    }).then(result => {
        return createdQuestion;
    })
    .catch(err => {
        console.log('erreur: '+ err)
        throw err;
    });
    return question;
  }
}