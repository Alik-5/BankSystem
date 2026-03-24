const express = require("express");
const app = express();
app.use(express.json());

app.get("/api/register", (req, res) => {
    res.json({ email: "user@example.com", password: "yourpassword" });
});

app.post("/api/register", (req, res) => {
    res.json(req.body);
});

app.listen(3000);