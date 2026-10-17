
let username = "";
let comment = "";
let restext = "";

export function inputCleaner(req, res, next) {
    if (req.body.comment) {
        req.body.comment = req.body.comment.replace(/(<([^>]+)>)/ig, "");
        next();
    }
};

export function inputCleaner_(req, res, next) {
    if (req.body.username) {
        req.body.username = req.body.username.toLowerCase();
        next();
    };
};


export function inputValidator(req, res, next) {
    if (req.body.username) {
        if (req.body.username.length >= 3) {
            next();
        } else if (req.body.username.length < 3) {
            res.redirect("/form?error=Username must be at least 3 characters.");
        };
    };
};
