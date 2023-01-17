const express = require('express');
var path = require('path');
const app = express();
const port = 1337;

app.get('/', (req, res) => {
    res.sendFile('index.html', {root: __dirname});
});

app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
    console.log(`Now listening on port ${port}`);
});