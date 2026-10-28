import { verifyToken } from "../utils/jwt.js";


export function authenticate(req, res, next) {
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith("Bearer ")) {
        res.status(401).json({ error: "No token provided." });
        return;
    }
    const token = auth.split(" ")[1];
    const payload = verifyToken(token);
    if (!payload) {
        res.status(401).json({ error: "Invalid or expired token." });
        return;
    } else {
        req.user = payload;
    }
    next();
}