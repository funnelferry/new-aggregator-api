const jwt = require("jsonwebtoken");
const userinfo = require("../userinfo");

const verifyToken = (req, res, next) => {
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
    jwt.verify(req.headers.authorization.split(' ')[1], process.env.API_SECRET, function (err, decode) {
      if (err)  {
        req.user = undefined;
        next();
      }
        const user = userinfo.find(u => u.email === decode.email);

        // If the user is not found, return an error
        if (!user) {
            return res.status(401).send('Invalid email or password');
        }

        req.user = user;
        next();
    });
  } else {
    req.user = undefined;
    req.message = "Authorization header not found";
    next();
  }
};
module.exports = verifyToken;