const express = require('express');
const app = express();
const { config } = require('dotenv');
config();
const {AuthVerify} = require("../src/middlewares/Authverify");
const cors = require('cors')
const userRoute = require('./routes/usersroute');
const foodRoute = require('./routes/foodroute');
const billRoute = require('./routes/billsroute');

const jwt = require('jsonwebtoken');
app.use(cors());
  
const port = process.env.PORT;
app.use(express.json())

app.use('/api/users', userRoute);
app.use('/api/foodItems',AuthVerify, foodRoute);
app.use('/api/bills',AuthVerify, billRoute);

app.listen(port, () => {
  console.log('server started at ', port);
});

module.exports = app;