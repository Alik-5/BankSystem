const express = require('express');
const http = require('http');
const app = express();

app.use(express.json());
app.use(express.static('public'));

const AUTH = 'Basic ' + Buffer.from('Supervisor:Supervisor').toString('base64');

function req(method, url, data) {
    return new Promise((ok, no) => {
        const r = http.request({
            hostname: 'localhost',
            port: 80,
            path: '/DevO/0/odata/' + url,
            method: method,
            headers: { 'Authorization': AUTH, 'Content-Type': 'application/json' }
        }, res => {
            let d = '';
            res.on('data', c => d += c);
            res.on('end', () => res.statusCode === 200 || res.statusCode === 201 ? ok(JSON.parse(d)) : no(d));
        });
        r.on('error', no);
        if (data) r.write(JSON.stringify(data));
        r.end();
    });
}

app.post('/api/register', async (req, res) => {
    try {
        const c = await req('POST', 'Contact', { Name: req.body.email.split('@')[0], Email: req.body.email });
        await req('POST', 'SysAdminUnit', { Name: req.body.email, Email: req.body.email, ContactId: c.Id, SysAdminUnitType: 4, Active: true, UserPassword: req.body.password });
        res.json({ ok: true, msg: 'Գրանցումը հաջողվեց' });
    } catch(e) { res.json({ ok: false, msg: 'Սխալ' }); }
});

app.listen(3000, () => console.log('http://localhost:3000'));