const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reponseSchema = new Schema({
    question: {
        type: Schema.Types.ObjectId,
        ref: 'Question'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
},{timestamps: true});

module.exports =mongoose.model('Reponse', reponseSchema);