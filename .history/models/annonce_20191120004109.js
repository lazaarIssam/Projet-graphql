const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const annonceSchema = new Schema({
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
    }
});

module.exports =mongoose.model('Annonce', annonceSchema);
