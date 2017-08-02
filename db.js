const Sequelize = require('sequelize');

const conn = new Sequelize(process.env.DATABASE_URL);

conn.authenticate()
  .then(()=> {
    console.log('connected');
  })
  .catch((err)=> {
    console.log(err);
  });

const Category = conn.define('category', {
  name: Sequelize.STRING
});

const Product = conn.define('product', {
  name: Sequelize.STRING
});

Product.belongsTo(Category);
Category.hasMany(Product);

const sync = ()=> {
  return conn.sync({ force: true });

};

const seed = ()=> {
  return Promise.all([
    Category.create({ name: 'Foo Category' }),
    Category.create({ name: 'Bar Category' })
  ])
  .then((result)=> {
    return Promise.all([
      Product.create({ name: 'foo', categoryId: result[0].id }),
      Product.create({ name: 'foo 2', categoryId: result[0].id }),
      Product.create({ name: 'bar', categoryId: result[1].id }),
    ]);
  });

};

module.exports = {
  sync,
  seed,
  models: {
    Category,
    Product
  }
};
