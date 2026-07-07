const Personne = require("../models/Personne");

exports.getAll = async (req, res) => {

    try {

        const personnes = await Personne.find().sort({ id: 1 });

        res.json(personnes);

    } catch (err) {

        res.status(500).json(err);

    }

};

exports.create = async (req, res) => {
    try {

        const { id, nom, prenom } = req.body;

    
        const existe = await Personne.findOne({ id });

        if (existe) {
            return res.status(400).json({
                success: false,
                message: "This ID already exists."
            });
        }

        const personne = await Personne.create({
            id,
            nom,
            prenom
        });

        res.status(201).json({
            success: true,
            personne
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false,
            message: "Server error."
        });

    }
};