import express from "express";
import {findByUsername} from "../utils/db.js"
import bcrypt from "bcryptjs";
import { signToken } from "../utils/jwt.js";
const router = express.Router();
export default router;


router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        res.status(400).json({ error: "Username and password are required" });
        return;
    } else if (!findByUsername(username)) {
        res.status(401).json({ error: "Invalid credentials" });
        return;
    }

    const user = findByUsername(username);
    
    const match = await bcrypt.compare(password, user.passwordHash);
    if (findByUsername(username) && !match){
        res.status(401).json({ error: "Invalid credentials" });;
        return;
    }else{
        const token = signToken({
            id: user.id, 
            email: user.username, 
            role: user.role
        });
        res.status(200).json({message: "User login successfully", token});
    }
});