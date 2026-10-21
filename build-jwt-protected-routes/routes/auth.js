import express from "express";
import { findByEmail, readUsers, writeUsers } from "../utils/db.js";
import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";
import { signToken } from "../utils/jwt.js";
import authenticate from "../middleware/authenticate.js";
import { blacklistToken } from "../utils/token-blacklist.js";
const router = express.Router();
export default router;

router.get("/profile", authenticate, (req, res) =>{
    res.json({user: req.user});
});

router.post("/register", async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body)

    if (!email || !password) {
    console.log(1)
        res.status(400).json({ message: "Email and password are required" });
        return;
    } else if (findByEmail(email)) {
    console.log(2)
            res.status(409).json({ message: "Email already in use" }); 
            return;   
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const users = readUsers();
    
    const newUser = {
        id: randomUUID(),
        email,
        passwordHash,
        role: "user"
    };
    users.push(newUser);
    writeUsers(users);

    const token = signToken({id: newUser.id, 
        email: newUser.email, 
        role: newUser.role
    });
    res.status(201).json({message: "User registered successfully", token});
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ message: "Email and password are required" });
        return;
    } else if (!findByEmail(email)) {
        res.status(401).json({ message: "Invalid credentials" });
        return;
    }

    const user = findByEmail(email);
    
    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match){
        res.status(401);
        return;
    }else{
        const token = signToken({
            id: user.id, 
            email: user.email, 
            role: user.role
        });
        res.status(200).json({message: "User login successfully", token});
    }
});

router.post("/logout", authenticate, (req, res) => {
    const auth = req.headers.authorization;
    if (auth){
        const token = auth.split(" ")[1];
        blacklistToken(token);
        res.json({message: "Logged out successfully"});
    }
});