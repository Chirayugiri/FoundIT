const express = require('express');
const cors = require('cors');
const {productRouter, userRouter} = require('./routes/routes');

const app = express();

//Middlewares
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//routes
app.use('/user', userRouter);
app.use('/product', productRouter);

app.listen(9000, ()=>{
    console.log('Server started at port 9000')
})