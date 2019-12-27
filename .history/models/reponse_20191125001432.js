const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reponseSchema = new Schema({
    question: {
        type: Schema.Types.ObjectId,
        ref: 'Question'
    }
});

module.exports =mongoose.model('Reponse', reponseSchema);