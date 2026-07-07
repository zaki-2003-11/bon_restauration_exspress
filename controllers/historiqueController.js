const Consommation = require("../models/Consommation");

exports.getHistorique = async (req, res) => {

   try {

      const { nom, type, date } = req.query;

      let pipeline = [

         {
            $lookup: {
               from: "personnes",
               localField: "personneId",
               foreignField: "id",
               as: "personne"
            }
         },

         {
            $unwind: "$personne"
         }

      ];

      // Filter by person's name
      if (nom) {

         pipeline.push({
            $match: {
               $or: [
                  {
                     "personne.nom": {
                        $regex: nom,
                        $options: "i"
                     }
                  },
                  {
                     "personne.prenom": {
                        $regex: nom,
                        $options: "i"
                     }
                  }
               ]
            }
         });

      }

      // Filter by meal type
      if (type && type !== "tous") {

         pipeline.push({
            $match: {
               type: type
            }
         });

      }

      // Filter by meal date
      if (date) {

         const start = new Date(date);

         const end = new Date(date);
         end.setDate(end.getDate() + 1);

         pipeline.push({
            $match: {
               date: {
                  $gte: start,
                  $lt: end
               }
            }
         });

      }

      pipeline.push(

         {
            $project: {

               _id: 0,

               personneId: 1,

               nom: "$personne.nom",

               prenom: "$personne.prenom",

               type: 1,

               date: 1,

               heure: 1

            }
         },

         {
            $sort: {
               date: -1,
               heure: -1
            }
         }

      );

      const historique = await Consommation.aggregate(pipeline);

      res.json(historique);

   }

   catch (err) {

      console.error(err);

      res.status(500).json({
         message: "Erreur lors de la récupération de l'historique."
      });

   }

};

exports.getHistoriquePersonne = async (req, res) => {

   try {

      const id = Number(req.params.id);

      const historique = await Consommation.find({
         personneId: id
      })
         .sort({
            date: -1,
            heure: -1
         });

      res.json(historique);

   }

   catch (err) {

      console.error(err);

      res.status(500).json({
         message: "Erreur lors de la récupération de l'historique."
      });

   }

};