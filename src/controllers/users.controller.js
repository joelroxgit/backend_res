const db = require("../utils/config");
const jwt = require('jsonwebtoken');
const CustomError = require("../utils/customError");

const getUser = async (req,res) =>{
  const user = await db.User.findMany();
  if (!user) {
    errorMandatory(res);
  }
  res.status(200).json(user);
};


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
        phone: phone.toString(),
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
  const { userName, password, role } = req.body;
  if (!userName || !password) {
    throw new CustomError("all fields are mandatory", 400);
  }
  let payload;
  if(role == 'user'){
     payload = await db.user.findUnique({
      where: { username: userName },
    });
  } 
  if(role == 'admin'){
     payload = await db.admin.findUnique({
      where : {
        username : userName
      }
    }) 
  }

  if (!payload || payload.password !== password) {
    throw new CustomError("Incorrect username or password", 401);
  }

  const token = jwt.sign({
    userName: payload.username,
    userId: payload.id,
    role,
  }, process.env.SECRET_KEY);
  
  if (!token) {
    throw new CustomError("Error creating token", 500);
  }

  console.log(token)

  res.status(200).json({ token });
};

const userCurrentController = async (req, res) => {
  if (!req.user) {
    throw new CustomError("Authorization token Invalid or missing", 401);
  }
  res.status(200).json(req.user);
};




module.exports = {
  getUser,
  RegisterUser,
  userlogin,
  userCurrentController,
};
