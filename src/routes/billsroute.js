const { Router } = require("express");
const {
  getBillsController,
  createBillController,
  updateBillController,
  deleteBillController,
  getbillByid,
} = require('../controllers/bills.controller');

const router = Router();

router.route('/').get(getBillsController).post(createBillController);
router.route('/:id').put(updateBillController).delete(deleteBillController).get(getbillByid);

module.exports = router;
