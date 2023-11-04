const {validationResult } = require('express-validator');
const db = require("../../database/models");

// Función para procesar el formulario de inicio de sesión
module.exports = (req, res) => {
const errors = validationResult(req);

  if (errors.isEmpty()) {
    db.User.findOne({
      where: {
        email: req.body.email,
      },
    })
      .then((user) => {
        req.session.userLogin = {
          id: user.id,
          name: user.name,
          role: user.roleId,
        };

        req.body.remember !== undefined &&
          res.cookie("todaviaSirve", req.session.userLogin, {
            maxAge: 1000 * 60 * 5,
          });

        return res.redirect("/");
      })
      .catch((error) => console.log(error));
  } else {
    return  console.log(req.body),
   res.render('login', {
        errors : errors.mapped()
    })

  }
};

