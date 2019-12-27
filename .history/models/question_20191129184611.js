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
    createdReponses: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Reponse'
        }
    ]
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports =mongoose.model('Question', questionSchema);
