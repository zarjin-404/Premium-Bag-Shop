const express = require('express');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const flash = require('connect-flash');
const expressSession = require('express-session');
const app = express();
const port = 3000;

app.use(
  expressSession({
    secret: process.env.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  }),
);
app.use(flash());
app.use(express.json());
app.use(cookieParser());
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

const db = require('./config/mongoose.connect');

const homeRouter = require('./routes/index.routes');
const ownerRouter = require('./routes/owners.routes');
const productRouter = require('./routes/products.routes');
const userRouter = require('./routes/users.routes');

app.use('/', homeRouter);
app.use('/owners', ownerRouter);
app.use('/products', productRouter);
app.use('/users', userRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
