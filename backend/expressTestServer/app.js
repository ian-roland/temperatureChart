const express = require('express');
const app = express();
const port = 3000;



app.get('/', (req, res) => {
    res.send("Hello World!");
})

app.get('/about', (req, res) => {
    res.send("About");
})

app.get('/blog', (req, res) => {
    res.send("Blog");
})

app.get('/contact', (req, res) => {
    res.send("Contact");
})




app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})

