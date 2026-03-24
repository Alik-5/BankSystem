const express = require("express");
const app = express();
app.use(express.json());

app.post("/api/register", (req, res) => {
    res.json(req.body);
});

app.get("/api/register", (req, res) => {
    res.json({ email: req.body.email, password: req.body.password });
});

app.listen(3000);