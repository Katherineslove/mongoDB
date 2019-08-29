const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const config = require('./config.json')

const Product = require('./models/products');

const User = require('./models/users');


mongoose.connect(`mongodb+srv://katherineslove:${config.MONGO_PASSWORD}@cluster0-iro24.mongodb.net/shop?retryWrites=true&w=majority`, {useNewUrlParser: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('we are connected');
});

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
  // res.send(allProducts);
  Product.find().then(result =>{
    res.send(result)
  })
});

app.get('/products/:id', function(req, res) {
    const id = req.params.id;

    Product.findById(id, function (err, product) {
      res.send(product)
    });
});


app.post('/product', function(req, res) {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price
  });
  product.save().then(result => {
    res.send(result);
  })
  .catch(err => res.send(err));
});

app.patch('/editProduct/:id', function(req, res) {
  const id = req.params.id;
  const newProduct = {
    name: req.body.name,
    price: req.body.price
  }
  Product.updateOne({_id: id}, newProduct).then(results => {
    res.send(result);
  }).catch(err => res.send(err));
})

app.delete('/products/:id', function(req, res) {
  console.log('here');
  res.send('here')
  const id = req.params.id;
  Product.deleteOne({_id: id}).then(results => {
    res.send('deleted');
  }).catch(err => res.send(err));
})

app.post('/users', function(req, res) {
    User.findOne({ username: req.body.username}, function(err, checkUser) {
      // res.send(checkUser);
      if (checkUser){
        console.log('try again');
        res.send(checkUser);
      } else {
        const hash = bcrypt.hashSync(req.body.password);
        const user = new User({
          _id: new mongoose.Types.ObjectId(),
          username: req.body.username,
          email: req.body.email,
          password: hash,
        });

        user.save().then(result => {
          res.send(result);
        })  .catch(err => res.send(err));
      }
    });
});

app.post('/getUser', function(req, res) {
  // if(bcrypt.compareSync('password', hash)) {
  //   console.log('password matches');
  // } else {
  //   console.log('password does not match');
  // }

  console.log(req.body.username);
  console.log(req.body.password);


  User.findOne({ username: req.body.username}, function(err, getUser) {
    if (getUser){
      console.log('you are good to go');
      res.send(getUser);
    } else {
      res.send('there is noone with this username please register first');
    }
  });

});

app.listen(port, () => {
    console.clear();
    console.log(`application is running on port ${port}`)
});
