const { validationResult } = require("express-validator");
const { hashSync } = require("bcryptjs");
const db = require("../../database/models");

module.exports = (req, res) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    const { name, lastName, address, birthdate, email, password } = req.body;
    db.User.create({
      name: name.trim(),
      lastName: lastName.trim(),
      address: address.trim(),
      email: email.trim(),
      password: hashSync(password, 10),
      roleId: 2,
    })
    .then((user) => {
      console.log(user);
      console.log("db.Birthdate:", db.Birthdate);
      console.log("db.Address:", db.Address);
      db.Birthdate.create({
        userId: user.id,
        birthdate: birthdate,
      }).then(() => {
        db.Address.create({
          userId: user.id,
          address: address,
        }).then(() => {
          return res.redirect("/");
        });
      });
    })

      .catch((error) => console.log(error));
  } else {
    return res.render("register", {
      old: req.body,
      errors: errors.mapped(),
    });
  }
};
