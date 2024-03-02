const db = require("../utils/config");
const customError = require("../utils/customError");
const { errorMandatory } = require("../middlewares/errorHandler");


const getBillsController = async (req, res, next) => {
  const bills = await db.bill.findMany();
  if (!bills) {
    throw new customError("Cant get the Data");
  }

  res.status(200).json({ bills });
};


const createBillController = async (req, res) => {
  const {
    gst,
    netAmount,
    total
  } = req.body;
  const userId = req.userId;
  if (!total ||!gst ||!netAmount) {
    errorMandatory(res);
  }
  const bill = await db.bill.create({
    data:{
      gst,
      netAmount,
      total,
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
    } = req.body;
  if (!total) {
    throw new customError("All fields are mandatory", 400);
  }

  const updatedBill = await db.bill.update({
    where: { id: data.id },
      data: {
        gst,
        netAmount,
        total
      },
  });

  if (!updatedBill) {
    throw new customError("Cannot update bill", 500);
  }

  res.status(203).json(updatedBill);
};

const deleteBillController = async (req, res) => {
  const id = req.params;
  const bill = await db.bill.delete({
      where: { id: parseInt(id) },
    });

  if (!bill) {
    throw new customError("cannot delete bill", 500);
  }
};

const getbillByid = async (req, res) => {
  const id = req.params;
  const bill = await db.bill.findUnique({
    where: { id: parseInt(id) },
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
