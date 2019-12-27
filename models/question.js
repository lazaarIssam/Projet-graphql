const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const questionSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    createdReponses: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Reponse'
        }
    ],
    annonce: {
        type: Schema.Types.ObjectId,
        ref: 'Annonce'
    }
});

module.exports =mongoose.model('Question', questionSchema);
