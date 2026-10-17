import express from "express";
const app = express();
import { inputCleaner,inputCleaner_, inputValidator } from "./middleware.js";
const port = 3000;
const router = express.Router();

app.use(express.urlencoded({extended: true}));

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.redirect("/form");
});

router.use("/", (req, res, next) =>{
    inputCleaner(req, res, next);
}, (req, res, next) =>{
    inputCleaner_(req, res, next);
}, (req, res, next) =>{
    inputValidator(req, res, next);
});

router.post("/", (req, res) =>{
    res.json({username: req.body.username, comment: req.body.comment});
});

app.use("/submit", router);

app.get("/form", (req, res) => {
    res.status(200).send("");
});

app.listen(port, (req, res) => {
    console.log(`Server is running on port ${port}.`);
});
