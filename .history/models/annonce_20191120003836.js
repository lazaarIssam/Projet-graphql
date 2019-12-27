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
});
