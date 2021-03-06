const bcrypt = require('bcryptjs');

const Annonce = require('./models/annonce')
const User = require('./models/user')

const annonces = annonceIds => {
    return Annonce.find({_id: {$in: annonceIds}})
    .then(annonces => {
        return annonces.map(annonce => {
            return { ...annonce._doc, _id:annonce.id, creator: user.bind(this, annonce.creator) }
        });
    })
    .catch(err => {
        throw err;
    });
}

const user = userId => {
    return User.findById(userId)
    .then(user => {
        return { ...user._doc, _id: user.id, createdAnnonces: annonces.bind(this, user._doc.createdAnnonces)  }
    })
    .catch(err => {
        throw err;
    });
}

module.exports = {
    annonces: () => {
    return Annonce.find()
    .then(annonces =>{
        return annonces.map(res => {
            return { ...res._doc, _id: res.id, creator: user.bind(this, res._doc.creator) }
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
        description: args.annonceInput.description,
        creator: '5dd546103694d52f1c32d384'
    });
    let createdAnnonce;
    return annonce
    .save()
    .then(result =>{
        createdAnnonce = { ...result._doc, _id: result.id, creator: user.bind(this, result._doc.creator)};
       return User.findById('5dd546103694d52f1c32d384')
        console.log('result: '+result);
        
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
}