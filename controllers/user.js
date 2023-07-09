import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { setCookie } from "../utils/feature.js";
import ErrorHandler from "../middleware/error.js";

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) return next(new ErrorHandler("Bad Request", 400));

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return next(new ErrorHandler("Invalid E-mail or Password", 400));

    setCookie(user, res, "Login Successfully", 200);
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (req, res, next) => {};

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  let user = await User.findOne({ email });

  if (user) return next(new ErrorHandler("User already Registered", 400));

  const hashedPassword = await bcrypt.hash(password, 10);

  user = await User.create({ name, email, password: hashedPassword });

  setCookie(user, res, "Created Succefully", 201);
};

export const getMyProfile = (req, res) => {
  return res.status(200).json({
    success: true,
    user: req.user,
  });
};

export const logout = async (req, res) => {
  return res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Development" ? false : true,
    })
    .json({
      success: true,
      user: "User Logout Now",
    });
};
