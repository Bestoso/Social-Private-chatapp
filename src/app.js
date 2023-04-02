require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const { Server } = require('socket.io');
const path = require('path');
const connectToDB = require('./db/db.config')

const app = express();
const PORT = process.env.PORT; 

// we are located in the src folder, so we need to go back one folder to get to the public folder, we are gonna use path.resolve
app.use(express.static(path.resolve(__dirname, '../client/dist')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET, // this is used to encrypt the session id
    resave: false, // if the session is not modified, then don't save it again
    saveUninitialized: false, // if the session is not modified, then don't save it again
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // 1 day
    }
}));

connectToDB()

app.use('/api', require('./routes/app.router'));

// handle react router on refresh

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/dist', 'index.html'));
});

const httpServer = app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

const io = new Server(httpServer, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        credentials: true
    }
});

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('message:server', (message) => {
        console.log('message:server', message);
        io.emit('message:client', message);
    })
    socket.on('disconnect', () => {
        console.log('User disconnected');
    })
});

// We are gonna create a chatapp using socket.io

// para nuestro chat vamos a necesitar cumplir con varios pasos: 

// 1. Emitir mensajes desde el cliente al servidor

// 2. Escuchar mensajes desde el servidor y emitirlos a todos los clientes conectados

// 3. Guardar los mensajes en la base de datos para la persistencia

// 4. Mostrar los mensajes en el cliente, estillizando en base a si el mensaje es propio o de otro usuario