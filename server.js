const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const cors = require('cors');

const allProducts = require('./data/products');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());

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

app.post('/product', function(req, res) {
  // console.log('a post request has been made');
  console.log(req.body);
  let product = {
    name: req.body.name,
    price: req.body.price,
    message: "we are about to send this product to our database"
  }
  res.send(product);
})

app.listen(port, () => {
    console.clear();
    console.log(`application is running on port ${port}`)
});
