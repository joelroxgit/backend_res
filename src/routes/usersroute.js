const { Router } = require("express");
const { RegisterUser, userCurrentController, userlogin } = require('../controllers/users.controller');
const { AuthVerify } = require("../middlewares/Authverify");

const router = Router();

router.post('/login', userlogin);
router.get('/current',AuthVerify, userCurrentController);

module.exports = router;
