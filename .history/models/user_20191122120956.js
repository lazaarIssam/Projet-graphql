const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createdAnnonces: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Annonce'
        }
    ],
    createdQuestions: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Annonce'
        }
    ]
});

module.exports =mongoose.model('User', userSchema);