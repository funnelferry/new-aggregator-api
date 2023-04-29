const prefroutes = require('express').Router();
const bodyparser = require('body-parser');
const cors = require('cors');
const verifyToken = require('../middleware/authJWT');
const userinfo = require("../userinfo");

prefroutes.use(bodyparser.json());
prefroutes.use(bodyparser.urlencoded({ extended: false }));

prefroutes.get('/', verifyToken, (req, res) => {
    if (!req.user && req.message == null) {
        res.status(403).send({
            message: "Invalid JWT token"
          });
      }
      else if (!req.user && req.message) {
        res.status(403).send({
          message: req.message
        });
      }
      res.status(200);
      res.send(req.user.preferences);
});

prefroutes.post('/', verifyToken, (req, res) => {
    if (!req.user && req.message == null) {
        res.status(403).send({
            message: "Invalid JWT token"
          });
      }
      else if (!req.user && req.message) {
        res.status(403).send({
          message: req.message
        });
      }
      const user = userinfo.find(u => u.email === req.user.email);
      user.preferences = req.body.preferences;
      res.status(200);
      res.send('preferences added successfully ${req.body.preferences}');
});
