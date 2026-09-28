require("dotenv").config();

const express = require("express");
const cors = require("cors"); // importe le middlewear officiel pour Express
const connectDB = require("./config/db");
const fichesRoutes = require("../routes/fiches.routes");

const app = express();

app.use(cors({ origin: "http://localhost:5173" })); // autorise uniquement le Front React local 
app.use(express.json());

app.use("/api/v1/fiches", fichesRoutes);

app.get("/api/v1/health", (req, res) => {
  res.json({ status: "ok", app: "AppliFrais" });
});

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`API sur http://localhost:${PORT}`);
  });
});
