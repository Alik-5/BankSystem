const express = require("express");
const axios = require("axios");
const path = require("path");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// serve frontend
app.use(express.static(path.join(__dirname, "public")));

/* ======================
   CONFIG — CHANGE THIS
====================== */
const CREATIO_URL = "http://localhost/DevO";

/* ======================
   LOGIN
====================== */
app.post("/api/login", async (req, res) => {

    const { email, password } = req.body;

    try {
        const response = await axios.post(
            `${CREATIO_URL}/ServiceModel/AuthService.svc/Login`,
            {
                UserName: email,
                UserPassword: password
            },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

        res.json({
            success: true,
            message: "Login success",
            creatio: response.data
        });

    } catch (err) {
        res.status(401).json({
            success: false,
            message: "Creatio login failed"
        });
    }
});

/* ======================
   REGISTER (CREATE CONTACT)
====================== */
app.post("/api/register", async (req, res) => {

    const { name, email } = req.body;

    try {
        await axios.post(
            `${CREATIO_URL}/0/odata/Contact`,
            {
                Name: name,
                Email: email
            },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

        res.json({
            success: true,
            message: "User created in Creatio"
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Register failed"
        });
    }
});

/* ====================== */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>
    console.log("Server running on port " + PORT)
);