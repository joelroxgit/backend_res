const db = require("../utils/config");
const jwt = require('jsonwebtoken');
const CustomError = require("../utils/customError");

const RegisterUser = async (req, res) => {
  const { name, username, password, phone, email } = req.body;

  try {
    const existingUser = await db.User.findUnique({
      where: { username },
    });

    if (existingUser) {
      throw new CustomError("Username already exists", 400);
    }

    const user = await db.User.create({
      data: {
        name,
        username,
        password,
        email,
        phone,
      },
    });

    if (!user) {
      throw new CustomError("Cannot register user", 500);
    }

    res.status(201).json(user);
  } catch (error) {
   
    console.error(error);
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

const userlogin = async (req, res) => {
  const { userName, password } = req.body;
  if (!userName || !password) {
    throw new CustomError("all fields are mandatory", 400);
  }

  const user = await db.user.findUnique({
    where: { username: userName },
  });

  if (!user.password === password) {
    throw new Error("Incorrect password", 401);
  }

  const token = jwt.sign({
    userName: user.username,
    userId: user.id,
  }, process.env.SECRET_KEY);
  
  if (!token) {
    throw new CustomError("Error creating token", 500);
  }

  console.log(token)

  res.status(200).json(
    token,
  );
};

const userCurrentController = async (req, res) => {
  const token = req.user;
  if (!token) {
    throw new CustomError("token not available", 401);
  }
  
};

module.exports = {
  RegisterUser,
  userCurrentController,
  userlogin,
};
