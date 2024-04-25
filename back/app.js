const express = require("express"),
    cors = require("cors"),
    path = require("path"),
    http = require('http'),
    socketIo = require('socket.io'),
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
// passport.use(passportConfig.jwtStrategy);
passport.use('jwtUser', passportConfig.jwtUserStrategy);
passport.use('jwtAdmin', passportConfig.jwtAdminStrategy);

app.get('/', (req, res) => {
    return res.status(200).send('HELLO WORLD')
})
app.get('/test', (req, res) => {
    return res.status(200).send('THIS IS A TEST')
})
app.use((req, res) => {
    return res.status(404).send('404 NOT FOUND')
})


const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    }
});
io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
    socket.on("message300", (...args) => {
        console.log(args)
    });
});

server.listen(3000, () => {
    console.log(`Server is running on port 3000`);
});

