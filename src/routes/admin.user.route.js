const { Router } = require("express");
const router = Router();
const { RegisterUser, userCurrentController, userlogin, getUser } = require('../controllers/users.controller');


const { AuthVerify } = require("../middlewares/Authverify");

//admin authentication
router.post('/registerUser',AuthVerify, RegisterUser);
router.post('/login', userlogin);
router.get('/users',AuthVerify,getUser);
router.get('/current',AuthVerify, userCurrentController);


module.exports = router;