const User = require('../../models/user')
const Question = require('../../models/question')

const { dateToString } = require('../../helpers/date');

module.exports = {
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
        }
    }