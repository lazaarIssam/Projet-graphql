const bcrypt = require('bcryptjs');

const Annonce = require('../../models/annonce')
const User = require('../../models/user')

//---------------------------------------
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
//---------------------------------------
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

//---------------------------------------
module.exports = {
    events: async () => {
      try {
        const annonces = await Annonce.find();
        return annonces.map(annonce => {
          return {
            ...annonce._doc,
            _id: annonce.id,
            date: new Date(annonce._doc.date).toISOString(),
            creator: user.bind(this, annonce._doc.creator)
          };
        });
      } catch (err) {
        throw err;
      }
    },
    createAnnonce: async args => {
      const annonce = new Annonce({
        title: args.annonceInput.title,
        typedebien: args.annonceInput.typedebien,
        statusPub: args.annonceInput.statusPub,
        prix: +args.annonceInput.prix,
        date: new Date( args.annonceInput.date),
        description: args.annonceInput.description,
        creator: '5dd6c38f46814e14544edf95'
      });
      let createAnnonce;
      try {
        const result = await annonce.save();
        createdEvent = {
          ...result._doc,
          _id: result._doc._id.toString(),
          date: new Date(annonce._doc.date).toISOString(),
          creator: user.bind(this, result._doc.creator)
        };
        const creator = await User.findById('5c0fbd06c816781c518e4f3e');
  
        if (!creator) {
          throw new Error('User not found.');
        }
        creator.createdEvents.push(event);
        await creator.save();
  
        return createdEvent;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
//   createUser: async args => {
//       try{
//       const existingUser = await User.findOne({email: args.userInput.email})
//           if(existingUser){
//               throw new Error('User deja existe déja !');
//           }
//           const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
//           const user = new User({
//             email: args.userInput.email,
//             password: hashedPassword
//       })
//       const result = await user.save();
//           return { ...result._doc,password: null, _id: result.id }
//     }catch(err){
//           throw err;
//       }
//   }
// };
//---------------------------------------
createUser: async args => {
    try {
      const existingUser = await User.findOne({ email: args.userInput.email });
      if (existingUser) {
        throw new Error('User exists already.');
      }
      const hashedPassword = await bcrypt.hash(args.userInput.password, 12);

      const user = new User({
        email: args.userInput.email,
        password: hashedPassword
      });

      const result = await user.save();

      return { ...result._doc, password: null, _id: result.id };
    } catch (err) {
      throw err;
    }
  }
};