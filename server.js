const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('public'));

// Ձեր Creatio-ի կարգավորումները
const CREATIO_URL = 'http://localhost/DevO';
const CREATIO_USER = 'admin';  // Ձեր Creatio-ի login-ը
const CREATIO_PASS = 'admin';  // Ձեր Creatio-ի password-ը

app.post('/api/register', async (req, res) => {
    const { email, password } = req.body;
    
    console.log('=== Գրանցման սկիզբ ===');
    console.log('Email:', email);
    console.log('Creatio URL:', CREATIO_URL);
    
    try {
        // 1. Ստեղծել Contact
        const contactData = {
            Name: email.split('@')[0],
            Email: email
        };
        
        console.log('1. Ստեղծում եմ Contact...');
        console.log('Contact URL:', `${CREATIO_URL}/0/odata/Contact`);
        
        const contactRes = await fetch(`${CREATIO_URL}/0/odata/Contact`, {
            method: 'POST',
            headers: {
                'Authorization': 'Basic ' + Buffer.from(`${CREATIO_USER}:${CREATIO_PASS}`).toString('base64'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contactData)
        });
        
        console.log('Contact Response Status:', contactRes.status);
        
        if (!contactRes.ok) {
            const errorText = await contactRes.text();
            console.log('Contact Error:', errorText);
            throw new Error(`Contact չստեղծվեց: ${contactRes.status} - ${errorText}`);
        }
        
        const contact = await contactRes.json();
        console.log('Contact ստեղծվեց, ID:', contact.Id);
        
        // 2. Ստեղծել User
        const userData = {
            Name: email,
            Email: email,
            ContactId: contact.Id,
            SysAdminUnitType: 4,
            Active: true,
            UserPassword: password
        };
        
        console.log('2. Ստեղծում եմ User...');
        
        const userRes = await fetch(`${CREATIO_URL}/0/odata/SysAdminUnit`, {
            method: 'POST',
            headers: {
                'Authorization': 'Basic ' + Buffer.from(`${CREATIO_USER}:${CREATIO_PASS}`).toString('base64'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        
        console.log('User Response Status:', userRes.status);
        
        if (!userRes.ok) {
            const errorText = await userRes.text();
            console.log('User Error:', errorText);
            throw new Error(`User չստեղծվեց: ${userRes.status} - ${errorText}`);
        }
        
        console.log('=== Գրանցումը հաջողվեց ===');
        res.json({ success: true, message: 'Գրանցումը հաջողվեց' });
        
    } catch(error) {
        console.error('=== ՍԽԱԼ ===');
        console.error(error.message);
        res.json({ success: false, message: error.message });
    }
});

app.listen(3000, () => {
    console.log('=================================');
    console.log('Server started on http://localhost:3000');
    console.log('Creatio URL:', CREATIO_URL);
    console.log('=================================');
});