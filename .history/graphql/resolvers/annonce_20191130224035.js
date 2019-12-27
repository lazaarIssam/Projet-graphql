const Annonce = require('../../models/annonce')
const User = require('../../models/user')

const { dateToString } = require('../../helpers/date');

module.exports = {
    annonces: () => {
    return Annonce.find()
    .then(annonces =>{
        return annonces.map(res => {
            return { 
                ...res._doc,
                _id: res.id,
                // date: new Date(res._doc.date).toISOString(),
                date: dateToString(res._doc.date),
                createdQuestions: questions.bind(this, res._doc.createdQuestions),
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
                creator: user.bind(this, res._doc.creator),
                createdReponses: reponses.bind(this, res._doc.createdReponses)
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
        creator: '5de165141f63b02e88596745'
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
       return User.findById('5de165141f63b02e88596745')
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
  updateAnnonce:  (args) => {
    return Annonce.findOne({_id:args.annonceId}).then(annonce =>{
        if(!annonce){
            throw new Error('aucune annonce trouvé');
        }
        annonce.title= args.annonceUpdateInput.title;
        annonce.typedebien = args.annonceUpdateInput.typedebien;
        annonce.statusPub = args.annonceUpdateInput.statusPub;
        annonce.prix = +args.annonceUpdateInput.prix;
        annonce.date = new Date( args.annonceUpdateInput.date);
        annonce.description = args.annonceUpdateInput.description;
        return annonce.save().then(result =>{
            return { 
                ...result._doc,
                _id: result.id,
                creator: user.bind(this, result._doc.creator)
            }
        })
    })
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
    deleteAnnonce: async args =>{
        try{
            const annonce = await Annonce.findById(args.annonceId).populate('creator');
            if(!annonce){
                throw new Error('Annonce existe pas !');
            }
            const creator = { 
                ...annonce.creator._doc,
                creator: user.bind(this, annonce.creator._doc.creator)
             }
            await Annonce.deleteOne({_id: args.annonceId});
            return creator;
        }catch (err){
            throw err;
        }
    }    
}