const db = require("../utils/config");
const customError = require("../utils/customError");
const { errorMandatory } = require("../middlewares/errorHandler");


const getBillsController = async (req, res, next) => {
  const bills = await db.bill.findMany();
  if (!bills) {
    throw new Error("Cant get the Data");
  }

  res.status(200).json({ bills });
};


const createBillController = async (req, res) => {
  const {
    gst,
    discount,
    netAmount,
    total,
    customerName,
    mobileNumber
  } = req.body;
  const userId = req.userId;
  if (!total || !customerName  || !mobileNumber ||!gst ||!discount ||!netAmount) {
    errorMandatory(res);
  }
  const bill = await db.bill.create({
    data:{
      gst,
    discount,
    netAmount,
    total,
    customerName,
    mobileNumber,
    userId
    }
  });

  if (!bill) {
    throw new customError("Cannot create bill", 500);
  }

  res.status(203).json(bill);
};


const updateBillController = async (req, res) => {
  const { total,
    customerName,
    mobileNumber} = req.body;
  if (!total || !customerName || !mobileNumber) {
    throw new Error("All fields are mandatory", 400);
  }

  const updatedBill = await db.bill.update({
    where: { id: data.id },
    data: {
      total,
      customerName,
      mobileNumber
    },
  });

  if (!updatedBill) {
    throw new customError("Cannot update bill", 500);
  }

  res.status(203).json(updatedBill);
};

const deleteBillController = async (req, res) => {
  const id = req.params.id;

  const bill = await db.bill.delete({
    where: { id: id },
  });

  if (!bill) {
    throw new customError("cannot delete bill", 500);
  }
};

const getbillByid = async (req, res) => {
  const id = req.params.id;

  const bill = await db.bill.findUnique({
    where: { id: id },
  });

  if (!bill) {
    throw new customError("cannot find bill", 500);
  }

  res.status(200).json(bill);
};

module.exports = {
  getBillsController,
  createBillController,
  updateBillController,
  deleteBillController,
  getbillByid,
};
