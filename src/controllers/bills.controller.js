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

  const { items, mobileNumber,customerName } = req.body;

  let netAmount;
  items.forEach(item => {
    netAmount += quantity * price;
    
  });
  const gst = netAmount * 10/100;
  const bill = await db.bill.create({
    data : {
      netAmount,
      gst,
      total : netAmount + gst,
      mobileNumber,
      customerName,
      billItems : {
        createMany : {
          data : items
        }
      }
    }
  })

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
