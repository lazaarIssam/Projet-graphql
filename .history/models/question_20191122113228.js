const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const questionSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    typedebien: {
        type: String,
        required: true
    },
    statusPub: {
        type: String,
        required: true
    },
    prix: {
        type: Number,
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
    }
});

module.exports =mongoose.model('Annonce', questionSchema);
