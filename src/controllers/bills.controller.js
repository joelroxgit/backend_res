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

// billController.js

const createBillController = async (req, res) => {
  try {
    const { selectedItems, totalAmount } = req.body;
    console.log(selectedItems)
    // Calculate netAmount and total based on the bill items data
    const netAmount = totalAmount; // Placeholder, you should calculate it based on your logic
    const gst = netAmount * 0.1; // Assuming GST is calculated as 10% of the total price
    const total = netAmount + gst;

    // Create the bill and its associated bill items
    const createdBill = await db.bill.create({
      data: {
        netAmount,
        gst,
        total,
        billItems: {
          createMany: {
            data: selectedItems.map(item => ({
              quantity: item.quantity,
              foodItemName: item.name,
              price: item.price, // Assuming price is available in selectedItems
              foodItemId: item.id // Assuming 'id' is the unique identifier for the food item
            }))
          }
        }
      },
      include: {
        billItems: true // Including bill items in the response
      }
    });

    res.status(201).json(createdBill);
  } catch (error) {
    console.error('Error creating bill:', error);
    res.status(500).json({ error: 'Failed to create bill' });
  }
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
