
function notFoundHandler(req, res, next){
    const err = new Error(req.originalUrl);
    err.status = 404;
    next(err)
};
/*
function finalErrorHandler(err, req, res, next){
    res.status(err.status || 500);
    console.log(err)
    if (err.status == 500){
        res.send({"error": true, 
        "status": err.status, 
        "message": "Internal Server Error (Check Server Logs)"});
    }else{
        res.send({"error": true, 
        "status": err.status, 
        "message": err.message});
    };
};
*/

function finalErrorHandler(err, req, res, next){
    res.status(err.status || 500);
    console.log(err);
    
    if (err.status == 500){
        res.send({error: true, 
            status: 500, 
            message: "Internal Server Error (Check Server Logs)"});
    }else{
        res.send({error: true, 
            status: err.status, 
            message: err.message});
    };
};

module.exports = {
    notFoundHandler: notFoundHandler, 
    finalErrorHandler: finalErrorHandler
};

/*
function finalErrorHandler(err, req, res, next){
    res.status(err.status || 500);
    const message = ""
    console.log(err)
    if (err.status == 500){ 
        message = "Internal Server Error (Check Server Logs)";
    }else{ 
        message = err.message;
    };
        res.send({"error": true, 
        "status": err.status, 
        "message": message});
};
*/