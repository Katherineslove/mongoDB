const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

const allProducts = require('./data/products');

app.use(function(req, res, next){
    console.log(`${req.method} request for ${req.url}`);
    next();
});

app.get('/', function(req, res){
    res.send('Welcome to our Products API. Use endpoints to filter out the data');
});

app.get('/all', function(req, res) {
  res.json(data);
});

app.get('/name', (req, res) => res.send('Instock'));
app.get('/price', (req, res) => res.send('min price'));

app.listen(port, () => {
    console.clear();
    console.log(`application is running on port ${port}`)
});
