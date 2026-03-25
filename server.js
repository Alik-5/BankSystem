const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static('public'));

// 👇 ԱՅՍ ՏՈՂԸ ՓՈԽԵՔ ՁԵՐ ՏՎՅԱԼՆԵՐՈՎ
const CREATIO_URL = 'http://localhost/DevO'; 
const CREATIO_AUTH = 'Basic ' + Buffer.from('Supervisor:Supervisor').toString('base64');
// 👆 ՎԵՐԵՎՈՒՄ admin:password-ը ՓՈԽԱՐԻՆԵՔ ՁԵՐ ԼՈԳԻՆԸ:ԳԱՂՏՆԱԲԱՌԸ

app.post('/api/register', async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const contact = await fetch(`${CREATIO_URL}/0/odata/Contact`, {
            method: 'POST',
            headers: {
                'Authorization': CREATIO_AUTH,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ Name: email.split('@')[0], Email: email })
        });
        const contactData = await contact.json();
        
        await fetch(`${CREATIO_URL}/0/odata/SysAdminUnit`, {
            method: 'POST',
            headers: {
                'Authorization': CREATIO_AUTH,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Name: email,
                Email: email,
                ContactId: contactData.Id,
                SysAdminUnitType: 4,
                Active: true,
                UserPassword: password
            })
        });
        
        res.json({ success: true, message: 'Գրանցումը հաջողվեց' });
    } catch(e) {
        res.json({ success: false, message: 'Սխալ: ' + e.message });
    }
});

app.listen(3000, () => console.log('Server on http://localhost:3000'));