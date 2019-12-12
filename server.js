const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const withAuth = require('./Middleware');

const mySecret = process.env.SECRET;

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("Connected to MongoDB!")
})

const citiesRouter = require('./Routes/cities');
const usersRouter = require('./Routes/users');
const tempRouter = require('./Routes/temperature');
const authenticationRouter = require('./Routes/authentication');

app.use('/cities', citiesRouter);
app.use('/users', usersRouter);
app.use('/temperature', tempRouter);
app.use('/authentication', authenticationRouter);

app.listen(port, () => console.log(`Server started on port ${port}`));


