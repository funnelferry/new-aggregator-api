const news = require('express').Router();
const bodyparser = require('body-parser');
const { fetchNewsByCategory } = require('../controllers/newsController');
const verifyToken = require('../middleware/authJWT');

news.use(bodyparser.json());
news.use(bodyparser.urlencoded({ extended: false }));

news.get('/', verifyToken, async (req, res) => {
    const articles = await fetchNewsByCategory(req.user.preferences);
    res.status(200);
    res.send(articles);
});

module.exports = news;