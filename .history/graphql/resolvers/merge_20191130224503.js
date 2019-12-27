const annonces = annonceIds => {
    return Annonce.find({_id: {$in: annonceIds}})
    .then(annonces => {
        return annonces.map(annonce => {
            return { 
                ...annonce._doc,
                _id:annonce.id,
                date: dateToString(annonce._doc.date),
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
                createdAt: dateToString(reponse._doc.createdAt),
                updatedAt: dateToString(reponse._doc.updatedAt),
                user: user.bind(this, reponse.user),
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
                date: dateToString(question._doc.date),
                creator: user.bind(this, question.creator),
                createdReponses: reponses.bind(this, question._doc.createdReponses)
             }
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
            createdAnnonces: annonces.bind(this, user._doc.createdAnnonces),
            createdQuestions: questions.bind(this, user._doc.createdQuestions),
            createdReponses: reponses.bind(this, user._doc.createdReponses)
        }
    })
    .catch(err => {
        throw err;
    });
}

exports.user = user;
exports.questions = questions;
exports.reponses= reponses;

