const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const annonceSchema = new Schema({
    title: {
        type: String,
        required: true
    }
    
});
