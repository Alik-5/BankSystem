const express = require("express");
const app = express();
app.use(express.json());
const PORT = 3000;

app.post("/api/register", (req, res) => {
    res.json(req.body);
});

app.get("/api/register", (req, res) => {
    res.json({

         email: "example@company.com", 
         password: "password123"
        
    });
});



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});