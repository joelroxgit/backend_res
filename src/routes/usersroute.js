const { Router } = require("express");
const { RegisterUser, userCurrentController, userlogin } = require('../controllers/users.controller');

const router = Router();

router.post('/login', userlogin);
router.post('/register', RegisterUser);
router.get('/current', userCurrentController);

module.exports = router;
