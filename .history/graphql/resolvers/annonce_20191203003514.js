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
  createAnnonce: async (args,req) => {
      if (!req.isAuth) {
          throw new Error('Unauthenticated!');
      }
      const us = await User.findOne({_id:req.userId});
      if(us.typeUser !='agent'){
          throw new Error('Action impossible');
      }
      const annonce = new Annonce({
          title: args.annonceInput.title,
          typedebien: args.annonceInput.typedebien,
          statusPub: args.annonceInput.statusPub,
          prix: +args.annonceInput.prix,
          date: new Date( args.annonceInput.date),
          description: args.annonceInput.description,
          creator: req.userId
        });
        let createdAnnonce;
        try {
          const result = await annonce.save();
          createdAnnonce = createdAnnonce = { 
              ...result._doc,
              _id: result.id,
              creator: user.bind(this, result._doc.creator)
          };
          const creator = await User.findById(req.userId);
    
          if (!creator) {
            throw new Error('User existe pas.');
          }
          creator.createdAnnonces.push(annonce);
          await creator.save();
    
          return createdAnnonce;
        } catch (err) {
          console.log(err);
          throw err;
        }
          
  },   
  updateAnnonce: (args,req) => {
    if (!req.isAuth) {
        throw new Error('Unauthenticated!');
    }
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
  deleteAnnonce: async (args,req) =>{
    if (!req.isAuth) {
        throw new Error('Unauthenticated!');
    }
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