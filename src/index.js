const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const routes = require('express').Router();
const { register, login} = require('./controllers/authController');
const preferences = require('./routes/preferences');
const news = require('./routes/news');

const app = express();
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(routes);

routes.use(bodyparser.json());
routes.use(bodyparser.urlencoded({ extended: false }));
require('dotenv').config();

const PORT = 3000;  

routes.get('/', (req, res) => {
    res.status(200).send('Welcome to News Aggregator API');
});

routes.post('/login', login);

routes.post('/register', register);

routes.use('/preferences', preferences);

routes.use('/news', news);

app.listen(process.env.PORT || PORT, (error) => {
    if(error){
        console.log("Error Occured while starting the server", error);
    }
    console.log(`Server running on port ${PORT}`);
})