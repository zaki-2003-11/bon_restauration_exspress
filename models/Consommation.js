const mongoose = require("mongoose");

const ConsommationSchema = new mongoose.Schema({

    personneId: {
        type: Number,
        required: true
    },

    type: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        required: true
    }

}, {
    timestamps: true
});

module.exports = mongoose.model("Consommation", ConsommationSchema);