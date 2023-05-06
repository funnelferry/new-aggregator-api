const prefroutes = require('express').Router();
const bodyparser = require('body-parser');
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
      // Check if the preferences key already exists
    if (user.hasOwnProperty('preferences')) {
        // If it exists, push the new fruit to the array
        user.preferences.push(req.body.preferences);
    } else {
        // If it does not exist, create the key and assign it an empty array, then push the new preference(s) to the array
        user.preferences = [];
        user.preferences.push(req.body.preferences);
    }
      res.status(200);
      res.send('preferences added successfully ${req.body.preferences}');
});

module.exports = prefroutes;
