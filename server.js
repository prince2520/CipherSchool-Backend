const express = require('express');
const app = express()
const server = require('http').Server(app);
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const authRoute = require('./router/auth');
const userRoute = require('./router/user');


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/auth', authRoute);
app.use('/user', userRoute);
app.use('/', (req, res, next) => {
    res.status(200).json({message: 'Server is Working...'});
    next();
})

const PORT = process.env.PORT || 5000;

mongoose.connect(`mongodb+srv://prince2520p:9674147@cluster0.ughjdvi.mongodb.net/ciperschools`, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(done => {
    console.log('Connected to Mongo DB')
    server.listen(PORT, () => {
        console.log('Connected to server', PORT)
    });
})