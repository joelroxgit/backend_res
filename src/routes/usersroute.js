const { Router } = require("express");
const { RegisterUser, userCurrentController, userlogin,getUser } = require('../controllers/users.controller');
const { AuthVerify } = require("../middlewares/Authverify");

const router = Router();

router.route('/admin/getUsers').get(getUser)
router.post('/login', userlogin);
router.post('/register',RegisterUser)
router.get('/current',AuthVerify, userCurrentController);

module.exports = router;
