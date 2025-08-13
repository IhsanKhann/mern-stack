import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import config from "./config.js";
import router from "./routes/routes.js";

const app = express();

app.use(cors({
  origin: config.clientURL,
  credentials: true
}));

app.use(express.json());

// mongodb connect...
mongoose.connect(config.mongoURL).then(()=>console.log("MongoDB connected")).catch(err=>console.error(err));

app.get("/", (req, res) => {
    res.send("API is running...");
});

app.use("/api", router);

const PORT = config.PORT || 5000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));