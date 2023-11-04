module.exports = {
    login : require('./users/login'),
    loginProcess : require('./users/loginProcess'),
    logOut : require('./users/logOut'),
    register : require('./users/register'),
    registerOk : (req,res) => {
        return res.render('registerOk');
    },
    update : require('./users/update'),
    profile : require('./users/profile'),

    newUser: require('./users/createUser'),
}
