import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import fs from "fs";


const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};


const createUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        if (await User.findOne({ email })) {
            return res.status(400).json({ error: "User already exists" });
        }
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });
        await newUser.save();
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const privateKey  = fs.readFileSync("./.cert/jwt.key", "utf8");
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        res.status(200).json({ message: "Login successful", userId: user._id, token: jwt.sign({ userId: user._id}, privateKey, { expiresIn: '1h', algorithm: 'RS256' }) });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

const logoutUser = (req, res) => {
    if (req.user) {
        req.user = null;
        return res.status(200).json({ message: "Logout successful" });
    }
    res.status(400).json({ error: "No user to logout" });
}

export { createUser, getUsers, loginUser, logoutUser };