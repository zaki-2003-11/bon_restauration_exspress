const Consommation = require("../models/Consommation");

exports.dashboard = async (req, res) => {

    try {

        const today = new Date();

        const startToday = new Date(today);
        startToday.setHours(0, 0, 0, 0);

        const endToday = new Date(today);
        endToday.setHours(23, 59, 59, 999);

        const startWeek = new Date(today);
        startWeek.setDate(today.getDate() - today.getDay());
        startWeek.setHours(0, 0, 0, 0);

        const endWeek = new Date(startWeek);
        endWeek.setDate(startWeek.getDate() + 6);
        endWeek.setHours(23, 59, 59, 999);

        const startMonth = new Date(today.getFullYear(), today.getMonth(), 1);

        const endMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0, 23, 59, 59, 999);

        const startYear = new Date(today.getFullYear(), 0, 1);

        const endYear = new Date(today.getFullYear(), 11, 31, 23, 59, 59, 999);

        async function getStats(start, end) {

            const result = await Consommation.aggregate([

                {
                    $match: {
                        date: {
                            $gte: start,
                            $lte: end
                        }
                    }
                },

                {
                    $group: {
                        _id: "$type",
                        total: {
                            $sum: 1
                        }
                    }
                }

            ]);

            let déjeuner = 0;
            let dîner = 0;

            result.forEach(r => {

                if (r._id === "déjeuner")
                    déjeuner = r.total;

                if (r._id === "dîner")
                    dîner = r.total;

            });

            return {

                total: déjeuner + dîner,

                déjeuner,

                dîner

            };

        }

        const todayStats = await getStats(startToday, endToday);

        const weekStats = await getStats(startWeek, endWeek);

        const monthStats = await getStats(startMonth, endMonth);

        const yearStats = await getStats(startYear, endYear);

        const top10 = await Consommation.aggregate([

            {
                $group: {

                    _id: "$personneId",

                    total: {
                        $sum: 1
                    }

                }
            },

            {
                $sort: {
                    total: -1
                }
            },

            {
                $limit: 10
            },

            {
                $lookup: {

                    from: "personnes",

                    localField: "_id",

                    foreignField: "id",

                    as: "personne"

                }
            },

            {
                $unwind: "$personne"
            },

            {
                $project: {

                    _id: 0,

                    personneId: "$_id",

                    nom: "$personne.nom",

                    prenom: "$personne.prenom",

                    total: 1

                }
            }

        ]);

        res.json({

            today: todayStats,

            week: weekStats,

            month: monthStats,

            year: yearStats,

            top10

        });

    }

    catch (err) {

        console.log(err);

        res.status(500).json(err);

    }

};