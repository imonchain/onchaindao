const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static(__dirname));

app.get('/:page', (req, res, next) => {
    const page = req.params.page;
    if (page === 'index') {
        res.redirect('/');
    } else {
        res.sendFile(path.join(__dirname, `${page}.html`), (err) => {
            if (err) {
                next();
            }
        });
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.use((req, res) => {
    res.status(404).send('Cannot GET ' + req.path);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});