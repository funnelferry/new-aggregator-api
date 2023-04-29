var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
const userinfo = require("../userinfo");

var register = (req, res) => {
    const user = {
    fullName: req.body.fullName,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
    };

    // push user to userinfo array and send 200 as response else error
    userinfo.push(user);
    res.status(200).send("User registered successfully");
};

var login = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    // Find the user with the given email
    const user = userinfo.find(u => u.email === email);

    // If the user is not found, return an error
    if (!user) {
        return res.status(401).send('Invalid email or password');
    }

    var passwordIsValid = bcrypt.compareSync(password, user.password);

    if(!passwordIsValid){
        return res.status(401).send('Invalid email or password');
    }

    //sign the token
    var token = jwt.sign({
        id: user.id, email
    }, process.env.API_SECRET, {
        expiresIn: 86400 // expires in 24 hours
    });
    
    // respond to client request with success and token
    res.status(200).send({
        user: {
          email: user.email,
          fullName: user.fullName
        },
        message: 'Login successful',
        token: token
      });

};

module.exports = {register, login};