import express from "express";
import authenticate from "../middleware/authenticate.js";
import authorizeRole from "../middleware/authorize.js";
import { readUsers } from "../utils/db.js";
const router = express.Router();

router.get("/users", authenticate, authorizeRole("admin"), (req, res) =>{
    let users = readUsers();
    function rm_pass(user_obj){
        for (let user_key in user_obj){
            delete user_obj['passwordHash'];
        }
    }
    users.forEach(rm_pass);
    res.json({ users });
});

export default router;