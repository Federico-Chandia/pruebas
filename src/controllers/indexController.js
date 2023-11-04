const db = require('../database/models');
const products = require('../data/products.json');

module.exports = {
  index: (req, res) => {
    console.log(req.session.userLogin);

    db.Product.findAll({
      include: {
        model: db.Image,
        as: 'images', // Debe coincidir con el alias en la definición de la asociación
      },
    })
      .then((products) => {
        res.render('index', { products });
      })
      .catch((error) => console.log(error));
  },
  admin : (req,res)  => {

    const products = db.Product.findAll({
        include : ['category','images']
    });
    const categories = db.Category.findAll();
    const users = db.User.findAll();

    Promise.all([products,categories,users])
        .then(([products,categories,users]) => {
            return res.render('admin', {
                products,
                categories,
                users
            })
        })
        .catch(error => console.log(error))
   
}
}


// module.exports = {
//     admin: (req, res) => {
//         db.Product.findAll()
//             .then(products => {
//                 res.render('admin.ejs', {products})
//             })
    
//         }
    
// } 