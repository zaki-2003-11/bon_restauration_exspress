const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/consommations", require("./routes/consommationRoutes"));
app.use("/personnes", require("./routes/personneRoutes"));
app.use("/historique", require("./routes/historiqueRoutes"));
app.use("/statistiques", require("./routes/statistiqueRoutes"));

const PORT = process.env.PORT || 5000;
app.get("/", (req, res) => {
    res.json({
        message: "Bon de Restauration API is running",
        endpoints: [
            "/personnes",
            "/consommations",
            "/historique",
            "/statistiques"
        ]
    });
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});