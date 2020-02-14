const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use('/:url', async (req, res) => {
    const { url } = req.params;
    try {
        const { data } = await axios.get(url);
        res.send(data);
    } catch (e) {
        res.status(500).send(e);
    }
});

app.use('*', (req, res) => res.status(404).send('Not found!'));

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});

module.exports = app;
