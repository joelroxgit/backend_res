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
        // Convert BigInt phone to string
        phone: phone.toString(),
      },
    });

    if (!user) {
      throw new CustomError("Cannot register user", 500);
    }

    // Convert any BigInt values to strings or numbers
    const userToSend = {
      ...user,
      // Convert any BigInt values to strings or numbers
      phone: user.phone.toString(),
      // Add other fields as needed
    };

    res.status(201).json(userToSend);
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

  if (!user || user.password !== password) {
    throw new CustomError("Incorrect username or password", 401);
  }

  const token = jwt.sign({
    userName: user.username,
    userId: user.id,
  }, process.env.SECRET_KEY);
  
  if (!token) {
    throw new CustomError("Error creating token", 500);
  }

  console.log(token)

  res.status(200).json({ token });
};

const userCurrentController = async (req, res) => {
  const token = req.user;
  if (!token) {
    throw new CustomError("Token not available", 401);
  }
  // Add logic to handle the current user based on the token
};

module.exports = {
  RegisterUser,
  userlogin,
  userCurrentController,
};
