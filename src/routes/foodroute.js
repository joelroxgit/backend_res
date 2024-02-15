const { Router } = require("express");
const {
  getfoodController,
  createfoodController,
  updatefoodController,
  deletefoodController,
  getfoodbyId,
} = require('../controllers/food.controller');

const router = Router();

router.route('/').get(getfoodController).post(createfoodController);
router.route('/:id').put(updatefoodController).delete(deletefoodController).get(getfoodbyId);

module.exports = router;
