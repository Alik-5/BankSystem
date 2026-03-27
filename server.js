const express = require("express");
const fetch = require("node-fetch");
const app = express();

app.use(express.json());
app.use(express.static("public"));

// API proxy դեպի Creatio
app.post("/create-contact", async (req, res) => {
  try {
    const response = await fetch("http://localhost:80/DevO/0/rest/UsrContactService/CreateContact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(req.body)
    });

    const data = await response.text();
    res.send(data);

  } catch (err) {
    console.error(err);
    res.status(500).send("Error");
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));