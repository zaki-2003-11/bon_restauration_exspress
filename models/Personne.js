const mongoose = require("mongoose");

const PersonneSchema = new mongoose.Schema({

    id: {
        type: Number,
        unique: true
    },

    nom: {
        type: String,
        required: true
    },

    prenom: {
        type: String,
        required: true
    }

});

module.exports = mongoose.model("Personne", PersonneSchema);