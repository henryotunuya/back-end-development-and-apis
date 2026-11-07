import express from "express";
import { addMovie, deleteMovie, getWatchlist, updateMovie } from "../utils/db.js"
import { authorizeModification } from "../middleware/authorize.js";
const router = express.Router();
export default router;

router.get("/:userId", (req, res) => {
    const id = req.params.userId;
    //console.log(getWatchlist(parseInt(id)))
    res.status(200).json(getWatchlist(parseInt(id)));
});

router.post("/:userId/movies", authorizeModification("parent"), (req, res) => {
    const movie = req.body;
    //console.log(movie)
    const id = req.params.userId;
    //console.log("**1")
    //console.log(movie)
    res.status(201)
    addMovie(parseInt(id), movie);
});

router.post("/:userId/movies", authorizeModification("child"), (req, res) => {
    const movie = req.body;
    // console.log(movie)
    //console.log("*1")
    const id = req.params.userId;
    res.status(201);
    addMovie(parseInt(id), movie);
});

router.put("/:userId/movies/:movieId",
    authorizeModification("parent"), (req, res) => {
        const updates = req.body;
        // console.log("*2")
        // console.log(updates)
        const id = req.params.userId;
        const movieId = req.params.movieId;
        res.status(200);
        updateMovie(parseInt(id), parseInt(movieId), updates);
    });

router.put("/:userId/movies/:movieId",
    authorizeModification("child"), (req, res) => {
        const updates = req.body;
        //console.log("*3")
        //console.log(updates)
        const id = req.params.userId;
        const movieId = req.params.movieId;
        res.status(200);
        updateMovie(parseInt(id), parseInt(movieId), updates);
    });

router.delete("/:userId/movies/:movieId",
    authorizeModification("parent"), (req, res) => {
        const movieId = req.params.movieId;
        const id = req.params.userId;
        res.status(200);
        deleteMovie(parseInt(id), parseInt(movieId));
    });

router.delete("/:userId/movies/:movieId",
    authorizeModification("child"), (req, res) => {
        const movieId = req.params.movieId;
        const id = req.params.userId;
        res.status(200);
        deleteMovie(parseInt(id), parseInt(movieId));
    });