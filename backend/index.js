const express = require('express');
const cors = require('cors');
const {productRouter, userRouter} = require('./routes/routes');
require('dotenv').config();

const app = express();

//Middlewares
app.use(cors({
  origin: 'https://found-it-two.vercel.app',
  credentials: true
}));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//routes
app.use('/user', userRouter);
app.use('/product', productRouter);

app.listen(process.env.PORT, ()=>{
    console.log('Server started at port ' + process.env.PORT);
})