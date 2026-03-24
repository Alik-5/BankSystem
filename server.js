const express = require("express");
const app = express();
app.use(express.json());
const PORT = 3000;



app.get("/api/register", (req, res) => {
    res.json({

         email: req.body.email, 
         password: req.body.password 
        
    });
});

app.post("/api/register", (req, res) => {
    res.json(req.body);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});