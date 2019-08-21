
const express = require('express');
const app = express();
const port = 3000;

const allProducts = require('./data/products');

app.use(function(req, res, next){
  console.log(`${req.method} request for ${req.url}`);
  next();
});

app.get('/', function(req, res){
  res.send('Welcome to our Products API. Use endpoints to filter out the data');
});

app.get('/all', function(req, res) {
  res.send(allProducts);
});

app.get('/products/:id', function(req, res) {
  const oneProduct = req.params.id;
  let filteredData = [];
  for (var i = 0; i < allProducts.length; i++) {
    if (allProducts[i].id.toString() === oneProduct) {
      filteredData.push(allProducts[i]);
    }
  }
  res.send(filteredData)
});

app.get('/products/edit/:id', function(req, res) {
  const oneProduct = req.params.id;
  let filteredData = [];
  for (var i = 0; i < allProducts.length; i++) {
    if (allProducts[i].id.toString() === oneProduct) {
      filteredData.push(allProducts[i]);
    }
  }
  res.send(filteredData)
});

app.get('/products/delete/:id', function(req, res) {
  const oneProduct = req.params.id;
  let filteredData = [];
  for (var i = 0; i < allProducts.length; i++) {
    if (allProducts[i].id.toString() === oneProduct) {
      filteredData.push(allProducts[i]);
    }
  }
  res.send(filteredData)
});

app.listen(port, () => {
    console.clear();
    console.log(`application is running on port ${port}`)
});
