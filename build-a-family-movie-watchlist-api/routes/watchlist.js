import express from "express";
import { addMovie, findByUsername, getWatchlist } from "../utils/db.js"
import { authenticate } from "../middleware/authenticate.js";
import { authorizeModification } from "../middleware/authorize.js";
const router = express.Router();
export default router;

router.get("/:userId", (req, res) => {
    //console.log(34)
    const id = req.params.userId;
    //console.log(getWatchlist(parseInt(id)))
    res.status(200).json(getWatchlist(parseInt(id)));
});

router.post("/:userId/movies", authorizeModification("parent"), (req, res) => {
    const movie = req.body;
    const id = req.params.userId;
    //console.log("**1")
    //console.log(movie)
    res.status(201)
    addMovie(parseInt(id), movie);
});

router.put("/:userId/movies/:movieId",
    authorizeModification("parent"), (req, res) => {
    });

router.put("/:userId/movies/:movieId",
    authorizeModification("child"), (req, res) => {
    });

router.delete("/:userId/movies/:movieId",
    authorizeModification("parent"), (req, res) => {
    });

router.delete("/:userId/movies/:movieId",
    authorizeModification("child"), (req, res) => {
    });