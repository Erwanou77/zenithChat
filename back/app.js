const express = require("express"),
    cors = require("cors"),
    path = require("path"),
    mongoose = require("mongoose"),
    passport = require('passport'),
    passportConfig = require('./src/config/passport')
    dotenv = require("dotenv");
dotenv.config({path: path.resolve(__dirname, '.env')});

const app = express()

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors({
    origin: '*',
    method: ["GET", "POST", "PATCH", "PUT", "DELETE"]
}))

app.use(express.urlencoded({extended: true}))
app.use(express.json())
require('./src/routes')(app)

// Use local and jwt strategy for passport
passport.use(passportConfig.localStrategy);
passport.use(passportConfig.jwtStrategy);

app.get('/', (req, res) => {
    return res.status(200).send('HELLO WORLD')
})
app.get('/test', (req, res) => {
    return res.status(200).send('THIS IS A TEST')
})
app.use((req, res) => {
    return res.status(404).send('404 NOT FOUND')
})

app.listen(3001, async (err) => {
    if (err){
        console.log('Error in server setup')
    } else {
        console.log(`Server running on at http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`)
    }
})

