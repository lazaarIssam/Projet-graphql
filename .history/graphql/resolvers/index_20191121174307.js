const bcrypt = require('bcryptjs');

const Annonce = require('../../models/annonce')
const User = require('../../models/user')

const annonces = async annonceIds => {
    try {
    const annonces = await Annonce.find({_id: {$in: annonceIds}})
    // .then(annonces => {
        annonces.map(annonce => {
            return { 
                ...annonce._doc,
                _id:annonce.id,
                date: new Date(annonce._doc.date).toISOString(),
                creator: user.bind(this, annonce.creator) 
            }
        });
        return annonces; 
    }catch(err){
        throw err;
    }
};

const user = async userId => {
    try {
        const users = await User.findById(userId)
        return { 
            ...user._doc,
            _id: user.id,
            createdAnnonces: annonces.bind(this, user._doc.createdAnnonces)  
        }
    } catch (err){
        throw err;
    }
};

module.exports = {
    annonces: async () => {
        try{
    const annonces = await Annonce.find()
        return annonces.map(res => {
            return { 
                ...res._doc,
                _id: res.id,
                date: new Date(res._doc.date).toISOString(),
                creator: user.bind(this, res._doc.creator)
             };
    })
    } catch (err){
    
        throw err;
    }   
  },
  createAnnonce: async (args) => {
    const annonce = new Annonce({
        title: args.annonceInput.title,
        typedebien: args.annonceInput.typedebien,
        statusPub: args.annonceInput.statusPub,
        prix: +args.annonceInput.prix,
        date: new Date( args.annonceInput.date),
        description: args.annonceInput.description,
        creator: '5dd546103694d52f1c32d384'
    });
    let createdAnnonce;
    try{
    const result = await annonce
    .save()
        createdAnnonce = { 
            ...result._doc,
            _id: result.id,
            date: new Date(result._doc.date).toISOString(),
            creator: user.bind(this, result._doc.creator)};
       const user = await User.findById('5dd546103694d52f1c32d384')
        if(!user){
            throw new Error('User existe pas !');
        }
        user.createdAnnonces.push(annonce);
        await user.save();
        return createdAnnonce;
    }catch (err){
        console.log('erreur: '+ err)
        throw err;
    };
    return annonce;
  },
  createUser: async args => {
      try{
      const existingUser = await User.findOne({email: args.userInput.email})
          if(existingUser){
              throw new Error('User deja existe déja !');
          }
          const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
          const user = new User({
            email: args.userInput.email,
            password: hashedPassword
      })
      const result = await user.save();
          return { ...result._doc,password: null, _id: result.id }
    }catch(err){
          throw err;
      }
  }
};