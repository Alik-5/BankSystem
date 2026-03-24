const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.post("/api/register", (req, res) => {
    const { email, password } = req.body;
    
    console.log({ email, password });
    
    if (!email || !password) {
        return res.status(400).json({ success: false, message: "All fields required" });
    }
    
    res.json({ success: true, message: "Registration successful", data: { email } });
});

app.post("/api/login", (req, res) => {
    const { email, password } = req.body;
    
    console.log({ email, password });
    
    if (!email || !password) {
        return res.status(400).json({ success: false, message: "All fields required" });
    }
    
    res.json({ success: true, message: "Login successful", user: { email } });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));