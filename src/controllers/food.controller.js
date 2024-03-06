const db = require("../utils/config");
const customError = require("../utils/customError");
const { errorMandatory } = require("../middlewares/errorHandler");

const getfoodController = async (req, res, next) => {
  try {
    const foodItems = await db.Foods.findMany();
    if (!foodItems) {
      errorMandatory(res);
    }
    res.status(200).json(foodItems);
  } catch (error) {
    console.error('Error getting food items:', error);
    res.status(500).json({ error: 'Failed to get food items' });
  }
};

const createfoodController = async (req, res) => {
  try {
    const { name, price, imageUrl, foodType } = req.body;
    if (!name|| !price || !imageUrl || !foodType) {
      throw new Error("All fields are mandatory", 400);
    }

    const foodItems = await db.Foods.create({
      data: {
        name,
        price : parseFloat(price),
        imageUrl,
        foodType
      },
    });

    if (!foodItems) {
      throw new customError("Cannot add Food item", 500);
    }

    res.status(203).json(foodItems);
  } catch (error) {
    console.error('Error creating food item:', error);
    res.status(500).json({ error: 'Failed to create food item' });
  }
};

const updatefoodController = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw new Error("All fields are mandatory", 400);
    }

    const updatedfoodItem = await db.Foods.update({
      where: { id:parseInt(id) },
      data: req.body,
    });

    if (!updatedfoodItem) {
      throw new customError("Cannot update food item", 500);
    }

    res.status(203).json(updatedfoodItem);
  } catch (error) {
    console.error('Error updating food item:', error);
    res.status(500).json({ error: 'Failed to update food item' });
  }
};

const deletefoodController = async (req, res) => {
  try {
    const {id} = req.params;
    await db.BillItem.deleteMany({ where: { foodItemId: parseInt(id) } })
    const foodItems = await db.Foods.delete({
      where: { id: parseInt(id) },
    });

    if (!foodItems) {
      throw new customError("Cannot delete food item", 500);
    }

    res.status(203).json(foodItems);
  } catch (error) {
    console.error('Error deleting food item:', error);
    res.status(500).json({ error: 'Failed to delete food item' });
  }
};

const getfoodbyId = async (req, res) => {
  try {
    const {id} = await req.params;
    const foodItem = await db.Foods.findUnique({
      where: { id: parseInt(id) },
    });

    if (!foodItem) {
      throw new customError("Cannot find food item", 500);
    }

    res.status(200).json(foodItem);
  } catch (error) {
    console.error('Error getting food item by id:', error);
    res.status(500).json({ error: 'Failed to get food item by id' });
  }
};

module.exports = {
  getfoodController,
  createfoodController,
  updatefoodController,
  deletefoodController,
  getfoodbyId,
};
