const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());
app.use(express.static('public'));

const CREATIO_URL = 'http://localhost/DevO';
const CREATIO_AUTH = 'Basic ' + Buffer.from('Supervisor:Supervisor').toString('base64');

app.post('/api/register', async (req, res) => {
    const { email, password } = req.body;
    
    try {
        // Ստեղծել Contact
        const contact = await axios.post(`${CREATIO_URL}/0/odata/Contact`, {
            Name: email.split('@')[0],
            Email: email
        }, {
            headers: { 'Authorization': CREATIO_AUTH }
        });
        
        // Ստեղծել User
        await axios.post(`${CREATIO_URL}/0/odata/SysAdminUnit`, {
            Name: email,
            Email: email,
            ContactId: contact.data.Id,
            SysAdminUnitType: 4,
            Active: true,
            UserPassword: password
        }, {
            headers: { 'Authorization': CREATIO_AUTH }
        });
        
        res.json({ success: true, message: 'Գրանցումը հաջողվեց' });
    } catch(e) {
        console.log(e.message);
        res.json({ success: false, message: 'Սխալ: ' + e.message });
    }
});

app.listen(3000, () => console.log('Server on http://localhost:3000'));