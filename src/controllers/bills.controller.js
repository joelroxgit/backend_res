const db = require("../utils/config");
const customError = require("../utils/customError");
const { errorMandatory } = require("../middlewares/errorHandler");

const getBillsController = async (req, res, next) => {
  try {
    const bills = await db.Bill.findMany();
    if (!bills) {
      throw new customError("Can't get the Data");
    }
    res.status(200).json({ bills });
  } catch (error) {
    console.error('Error getting bills:', error);
    res.status(500).json({ error: 'Failed to get bills' });
  }
};

const getAdminDashboard = async (req, res, next) => {
  try {
    const bills = await db.BillItem.findMany();
    if (!bills) {
      throw new customError("Can't get the Data");
    }
    res.status(200).json({ bills });
  } catch (error) {
    console.error('Error getting admin dashboard:', error);
    res.status(500).json({ error: 'Failed to get admin dashboard' });
  }
};

const createBillController = async (req, res) => {
  try {
    const { selectedItems, total, gst, netAmount } = req.body;
    const createdBill = await db.Bill.create({
      data: {
        netAmount,
        gst,
        total,
        billItems: {
          createMany: {
            data: selectedItems.map(item => ({
              quantity: item.quantity,
              foodItemName: item.name,
              price: item.price,
              foodItemId: item.id
            }))
          }
        }
      },
      include: {
        billItems: true
      }
    });
    res.status(201).json(createdBill);
  } catch (error) {
    console.error('Error creating bill:', error);
    res.status(500).json({ error: 'Failed to create bill' });
  }
};

const updateBillController = async (req, res) => {
  try {
    const { id } = req.params;
    const { gst, netAmount, total } = req.body;

    if (!gst || !netAmount || !total) {
      throw new customError("All fields are mandatory", 400);
    }

    const updatedBill = await db.bill.update({
      where: { id: parseInt(id) },
      data: {
        gst: parseFloat(gst),
        netAmount: parseFloat(netAmount),
        total: parseFloat(total)
      },
    });

    if (!updatedBill) {
      throw new customError("Cannot update bill", 500);
    }

    res.status(203).json(updatedBill);
  } catch (error) {
    console.error("Error updating bill:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteBillController = async (req, res) => {
  try {
    const { id } = req.params;
    await db.BillItem.deleteMany({ where: { billId: parseInt(id) } });
    const deletedBill = await db.Bill.delete({
      where: { id: parseInt(id) }
    });

    if (!deletedBill) {
      throw new customError("Bill not found", 404);
    }

    res.status(200).json({ message: 'Bill deleted successfully', deletedBill });
  } catch (error) {
    console.error("Error deleting bill:", error);
    res.status(error.statusCode || 500).json({ error: error.message || 'Internal Server Error' });
  }
};

const getbillByid = async (req, res) => {
  try {
    const { id } = req.params;
    const bill = await db.bill.findUnique({
      where: { id: parseInt(id) },
    });
    if (!bill) {
      throw new customError("Cannot find bill", 500);
    }
    res.status(200).json(bill);
  } catch (error) {
    console.error("Error getting bill by id:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getBillsController,
  getAdminDashboard,
  createBillController,
  updateBillController,
  deleteBillController,
  getbillByid,
};
