const express = require('express');
const router = express.Router();
const { register, newUser, profile, update, logOut } = require('../controllers/usersController');
const loginValidator = require("../validations/loginValidator");
const userCheck = require('../middlewares/userCheck');
const upload = require('../middlewares/upload');
const loginProcess = require('../controllers/users/loginProcess');
const notUserCheck = require('../middlewares/notUserCheck');
const {arrayValidaciones,validateCreateForm } = require('../middlewares/validacionesRegister');
const arrayValidationUpdate  = require('../validations/validationUpdate');
const login = require('../controllers/users/login');


/* GET users listing. */

router.get('/register',notUserCheck, register)
router.post('/registerOk', arrayValidaciones,validateCreateForm, newUser);
router.get('/login',notUserCheck, login);
router.post('/login', loginValidator, loginProcess);
router.get('/logOut', logOut);
router.get('/profile/', userCheck, profile);
router.put('/update/',upload.single('image'), arrayValidationUpdate, update);

module.exports = router;