const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 3000;

const db = require('./config/mongoose.connect');

const ownerRouter = require('./routes/owner.routes');
const productRouter = require('./routes/product.routes');
const userRouter = require('./routes/user.routes');

app.use(express.json());
app.use(cookieParser());
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/owner', ownerRouter);
app.get('/product', productRouter);
app.get('/user', userRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
