const express = require('express');
const app = express();
const { config } = require('dotenv');
config();
const {AuthVerify} = require("../src/middlewares/Authverify");
const cors = require('cors')
const userRoute = require('./routes/usersroute');
const foodRoute = require('./routes/foodroute');
const billRoute = require('./routes/billsroute');
const adminroute = require('./routes/admin.user.route')

app.use(cors());
  
const port = process.env.PORT || 5000;
app.use(express.json())

app.use('/api/users', userRoute);
app.use('/api/foodItems',AuthVerify, foodRoute);
app.use('/api/bills',AuthVerify, billRoute);
app.use("/api/admin",adminroute)

app.listen(port, () => {
  console.log('server started at ', port);
});

module.exports = app;
