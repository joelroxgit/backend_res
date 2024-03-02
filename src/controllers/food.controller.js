const db = require("../utils/config");
const customError = require("../utils/customError");
const { errorMandatory } = require("../middlewares/errorHandler");

const getfoodController = async (req, res, next) => {
  const foodItems = await db.Foods.findMany();
  if (!foodItems) {
    errorMandatory(res);
  }
  res.status(200).json(foodItems);
};

const createfoodController = async (req, res) => {
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
    throw new customError("cannot add Food item", 500);
  }

  res.status(203).json(foodItems);
};

const updatefoodController = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new Error("All fields are mandatory", 400);
  }

  const updatedfoodItem = await db.Foods.update({
    where: { id:parseInt(id) },
    data: req.body,
  });

  if (!updatedfoodItem) {
    throw new customError("Cannot update foodItem", 500);
  }

  res.status(203).json(updatedfoodItem);
};

const deletefoodController = async (req, res) => {
  const {id} = req.params;
  const foodItems = await db.Foods.delete({
    where: { id: parseInt(id) },
  });

  if (!foodItems) {
    throw new customError("cannot delete foodItem", 500);
  }

  res.status(203).json(foodItems);
};

const getfoodbyId = async (req, res) => {
  const {id} = await req.params;
  const foodItem = await db.Foods.findUnique({
    where: { id: parseInt(id) },
  });

  if (!foodItem) {
    throw new customError("cannot find foodItem", 500);
  }

  res.status(200).json(foodItem);
};

module.exports = {
  getfoodController,
  createfoodController,
  updatefoodController,
  deletefoodController,
  getfoodbyId,
};
