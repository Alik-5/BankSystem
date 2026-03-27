const express = require("express");
const fetch = require("node-fetch");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));

app.post("/create-contact", async (req, res) => {
    console.log("Received request:", req.body); // Լոգում ենք request-ը
    
    try {
        const { name, phone } = req.body;
        
        // Ստուգում ենք արժեքները
        if (!name || !phone) {
            return res.status(400).send("Name and phone are required");
        }
        
        // Creatio-ի URL-ը (փոխեք ձեր Creatio-ի հասցեին)
        const creatioUrl = "http://localhost/0/rest/UsrContactService/CreateContact";
        
        console.log("Calling Creatio:", creatioUrl);
        
        const response = await fetch(creatioUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                phone: phone
            })
        });
        
        const data = await response.text();
        console.log("Creatio response:", data);
        
        res.send(data);
    } catch (error) {
        console.error("Server error:", error);
        res.status(500).send("Error: " + error.message);
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});