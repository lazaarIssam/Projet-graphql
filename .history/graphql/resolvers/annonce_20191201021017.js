const Annonce = require('../../models/annonce')
const User = require('../../models/user')
const { user,questions } = require('./merge');

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
  createAnnonce: (args,req) => {
    if (!req.isAuth) {
        throw new Error('Unauthenticated!');
    }
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
  },
  updateAnnonce: (args) => {
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