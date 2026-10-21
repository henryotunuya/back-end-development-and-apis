import path from "path";
import fs from "fs";
const DB_PATH = path.join(import.meta.dirname, "../data/users.json");


export function readUsers(){
    const file = fs.readFileSync(DB_PATH, "utf-8").trim();
    if (file.length == 0){
        return [];
    }else{
        return JSON.parse(file);
    }
}

export function writeUsers(users){
    fs.writeFileSync(DB_PATH, JSON.stringify(users, null, 2));
}

export function findByEmail(email){
    return readUsers().find((user) => user.email === email) || null;
}

export function findById(id){
    return readUsers().find((user) => user.id === id) || null;
}