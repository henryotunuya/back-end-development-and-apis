
import express from "express";
const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.send("Welcome to Camper Bot's homepage!")
});

app.get("/hobbies", (req, res) => {
    res.send("I cycle, go boating, and play guitar.")
});

app.get("/skills", (req, res) => {
    res.send("JavaScript, Node.js, and Express.js!")
});

app.get("/api/profile", (req, res) => {
    const json_out = { "name" : "Camper Bot", "hobbies" : ['cycling', 
        'boating', 'guitar'], "skills" : ['JavaScript', 'Node.js', 
            'Express.js'
        ]}
    res.send(json_out)
});

app.listen(port, () => {
    console.log(`App on port ${port}`)
});

