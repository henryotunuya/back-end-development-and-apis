
export function authorizeModification(role){
    //role = "parent" || "child"
    return (req, res, next) => {
        if (!req.user || req.user.role !== role || req.params.userId !== req.user.id){
       // if (req.user.role !== role || req.params.userId !== req.user.id){
            res.status(403).json({error: "Access denied"});
            return;
        }
        next();
    };
}