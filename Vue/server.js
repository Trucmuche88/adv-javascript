const express = require('express');
const bodyParser = require('body-parser');

const fs = require('fs');
const cors = require('cors')

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.static('.'));

app.get('/catalogData', (req, res) => {
  fs.readFile('catalog.json', 'utf8', (err, data) => {
    res.send(data);
  });
});

app.get('/cart', (req, res) => {
  fs.readFile('cart.json', 'utf8', (err, data) => {
    res.send(data);
  });
});

app.post('/addToCart', (req, res) => {
  fs.readFile('cart.json', 'utf8', (err, data) => {
    if (err) {
      res.send('{"result": 0}');
    } else {
      const cart = JSON.parse(data);
      const newItem = req.body;

      const existingItem = cart.find((item) => item.id == newItem.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({ ...newItem, quantity: 1 });
      }

      fs.writeFile('cart.json', JSON.stringify(cart), (err) => {
        if (err) {
          res.send('{"result": 0}');
        } else {
          res.send(cart);
        }
      });
    }
  });
});

app.delete('/removeFromCart', (req, res) => {
  fs.readFile('cart.json', 'utf8', (err, data) => {
    if (err) {
      res.send('{"result": 0}');
    } else {
      const cart = JSON.parse(data);
      const itemToRemove = req.body;

      const itemIndex = cart.findIndex((item) => item.id == itemToRemove.id);

      if (false !== itemIndex) {
        cart.splice(itemIndex, 1);
      } 

      fs.writeFile('cart.json', JSON.stringify(cart), (err) => {
        if (err) {
          res.send('{"result": 0}');
        } else {
          res.send(cart);
        }
      });
    }
  });
});


app.listen(3000, function() {
  console.log('server is running on port 3000!');
});

