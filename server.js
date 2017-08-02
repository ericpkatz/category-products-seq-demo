const express = require('express');
const db = require('./db');

const app = express();

app.get('/products', (req, res, next)=> {
  db.models.Product.findAll({
    include: [
      db.models.Category
    ]
  })
    .then((products)=> {
      res.send(products);
    })
});

app.get('/categories/:id', (req, res, next) => {
  db.models.Category.findById(req.params.id, {
    include: [ db.models.Product ]
  })
    .then((category)=> {
      res.send(category);
    })
    .catch(next);
});

app.use((err, req, res, next)=> {
  res.send(err.message);
});

const port = process.env.PORT || 3000;


app.listen(port, ()=> {
  console.log(`listening on port ${port}`);
  db.sync()
    .then(()=> {
      console.log('synced');
      return db.seed();
    })
    .catch((err)=> {
      console.log(err);
    });
});
