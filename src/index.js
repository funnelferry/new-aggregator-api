const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const routes = require('express').Router();
const jsonwebtoken = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { register, login} = require('./controllers/authController');

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

// routes.post('/news', news);

// routes.post('/preferences', preferences);

app.listen(process.env.PORT || PORT, (error) => {
    if(error){
        console.log("Error Occured while starting the server", error);
    }
    console.log(`Server running on port ${PORT}`);
})