const express = require('express');
const db = require('./config/db');
const cors = require('cors');
const mainRoute = require('./routes/main.route');

const app = express();

const PORT = process.env.PORT || 5555;

db()

const allowedOrigins = ['http://localhost:3000', 'http://localhost:5555'];

const corsOptions = {
    origin: function(origin, callback){
        if(!origin)return callback(null, true);
        if(allowedOrigins.indexOf(origin) !== -1){
            return callback(null, true);
        } else {
            return callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    optionsSuccessStatus: 200,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', mainRoute);




app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})
