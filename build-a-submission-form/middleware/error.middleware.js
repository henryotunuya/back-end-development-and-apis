
export function notFoundHandler(req, res, next) {
    const err = new Error(req.originalUrl);
    err.status = 404;
    next(err)
};

export function finalErrorHandler(err, req, res, next) {
    res.status(err.status || 500);
    let message = ""
    console.log(err)
    message = err.message;

    if (err.status == 500) {
        message = "Internal Server Error (Check Server Logs)";
        res.json({
            error: true,
            status: "500",
            message: message
        });
    } else {
        res.json({
            error: true,
            status: err.status,
            message: message
        });
    };
};
