const Consommation = require("../models/Consommation");

exports.create = async (req, res) => {

    try {

        const consommation = await Consommation.create({

            personneId: req.body.personneId,

            type: req.body.type,
            date :req.body.date

        });

        res.status(201).json(consommation);

    }

    catch (err) {

        res.status(500).json(err);

    }

};

exports.bulkCreate = async (req, res) => {

    try {

        const { personnes, type,date } = req.body;

        let documents = [];

        for (const personneId of personnes) {

            if (type === "dîner_déjeuner") {

                documents.push({
                    personneId,
                    date,
                    type: "déjeuner"
                });

                documents.push({
                    personneId,
                    date,
                    type: "dîner"
                });

            } else {

                documents.push({
                    personneId,
                    date,
                    type
                });

            }

        }

        const result = await Consommation.insertMany(documents);

        res.status(201).json(result);

    } catch (err) {

        console.error(err);

        res.status(500).json(err);

    }

};

exports.getAll = async (req, res) => {

    try {

        const consommations = await Consommation
            .find()
            .sort({ date: -1 });

        res.json(consommations);

    } catch (err) {

        console.log(err);

        res.status(500).json(err);

    }

};