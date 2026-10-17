
import express from "express";

const app = express();
const now = new Date();
const port = 8000;

app.get("/api/", (req, res) => {
    res.json({
        unix: Date.parse(now),
        utc: now.toUTCString()
    });
});

app.get("/api/:date", (req, res) => {
    let date = req.params.date;
    let date_ = new Date(date);

    if (Number.isInteger(parseInt(date)) && date.length === 13) {
        let new_date = new Date(parseInt(date));
        res.json({
            unix: parseInt(date),
            utc: new_date.toUTCString()
        });

    } else if (isNaN(Date.parse(date))) {
        res.json({ error: "Invalid Date" })
    } else {
        const unix_v = Date.parse(date_);
        const utc_v = date_.toUTCString();
        res.json({
            unix: unix_v,
            utc: utc_v
        });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})