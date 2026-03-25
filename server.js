const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static('public'));

app.post('/api/register', async (req, res) => {
    const { email, password } = req.body;
    
    try {
        // Ստեղծել Contact
        const contact = await fetch('http://localhost:80/0/odata/Contact', {
            method: 'POST',
            headers: {
                'Authorization': 'Basic ' + Buffer.from('user:pass').toString('base64'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ Name: email.split('@')[0], Email: email })
        });
        const contactData = await contact.json();
        
        // Ստեղծել User
        await fetch('http://localhost:80/0/odata/SysAdminUnit', {
            method: 'POST',
            headers: {
                'Authorization': 'Basic ' + Buffer.from('user:pass').toString('base64'),
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
        res.json({ success: false, message: 'Սխալ' });
    }
});

app.listen(3000, () => console.log('Server on http://localhost:3000'));