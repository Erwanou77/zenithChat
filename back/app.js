const express = require("express"),
    cors = require("cors"),
    path = require("path"),
    http = require('http'),
    socketIo = require('socket.io'),
    mongoose = require("mongoose"),
    passport = require('passport'),
    passportConfig = require('./src/config/passport'),
    friendshipModel = require("./src/models/friendship"),
    userModel = require("./src/models/user"),
dotenv = require("dotenv");
const logger = require("nodemon/lib/utils");
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
passport.use(passportConfig.JwtSocketStrategy);
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

const wrapMiddlewareForSocketIo = middleware => (socket, next) => middleware(socket.request, {}, next);
io.use(wrapMiddlewareForSocketIo(passport.authenticate(['jwt'],{session: false})));

let connectedUsers = [];

io.on('connection', (socket) => {
    if (socket.handshake.query.id != undefined){
        connectedUsers.push(socket);
        const id=socket.handshake.query.id
        const result = async (id) => await userModel.findOne({_id:id})
        const user=result(id).then(user => {
            if (user) {
                socket.on("message", (message) => {
                    socket.broadcast.emit(user.username, `server response: ${message}`);
                });
            } else {
                console.log("User not found");
                // handle the case where the user is not found
            }
        })
            .catch(err => {
                console.error("Error occurred:", err);
                // handle the error in an appropriate way
            });
    }

    socket.on('disconnect', () => {
        connectedUsers = connectedUsers.filter(socket1 => socket1.id !== socket.id);
    });
});

server.listen(3000, () => {
    console.log(`Server is running on port 3000`);
});


