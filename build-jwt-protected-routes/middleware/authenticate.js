import { verifyToken } from "../utils/jwt.js";
import { isBlacklisted } from "../utils/token-blacklist.js";


export default function authenticate(req, res, next) {
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith("Bearer ")) {
        res.status(401).json({ message: "No token provided" });
    } else {
        const token = auth.split(" ")[1];
        if (isBlacklisted(token)) {
            res.status(401)
                .json({ message: "Token has been invalidated. Log in again." });
            return;
        }
        const payload = verifyToken(token);
        if (!payload) {
            res.status(401).json({ message: "Invalid or expired token" });
        } else {
            req.user = payload;
            next();
        }
    }
}