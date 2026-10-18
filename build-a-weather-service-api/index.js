
import express from "express";
import router from "./weather.js";
import path from "path";
import {fileURLToPath} from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, "public")));

app.use("/api/weather", router);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
//    res.status(200).send("Welcome to my weather API.");
});

app.get("/docs", (req, res) => {
    res.redirect("/api/info");
});

app.get("/api/greet/:name", (req, res) => {
    let name = req.params.name;
    res.status(200).json({greet: `hi ${name}!`});
});

app.get("/api/status", (req, res) => {
    res.status(200).json({status: "p"});
});

app.get("/api/info", (req, res) => {
    res.json({
        name: "Weather Service API", 
        version: "1.0.0",
        endpoints: ["/api/weather/:city", "/api/greet/:name", "/api/data"]
    });
});

app.route("/api/data")
.get((req, res) => {
    res.status(200).json({aux: "aux"});
})
.post((req, res) => {
    res.status(201).json({aux2: "aux2"});
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
});