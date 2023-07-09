import { User } from "../models/user.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token)
    return res.status(404).json({
      success: false,
      message: "Not Logged In",
    });

  const decodedData = jwt.verify(token, "khduildjfdhflg");
  req.user = await User.findById(decodedData._id);
  next();
};
