
import express from "express";
const app = express()
import apiRouter from "./routes/api.routes.js"

app.listen(3000, (req, res) => {
    console.log(`localhost:3000`)
});

app.use((req, res, next) => {
    console.log(req.method)
    console.log(req.url)
    next()
});

app.use("/api", apiRouter);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));