// controllers/userController.js
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import config from "../config.js";

function createAccessToken(user) {
  return jwt.sign({ id: user._id }, config.JWT_SECRET, { expiresIn: config.JWT_EXPIRE });
}

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({ success: false, message: "User not found." });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(400).json({ success: false, message: "Invalid password." });
    }

    const token = createAccessToken(user);

    const userObj = user.toObject();
    delete userObj.password;

    return res.status(200).json({
      success: true,
      data: {
        user: userObj,
        token
      }
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: "Error while logging in.", error: error.message });
  }
};

const SignUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ success: false, message: "User already exists." });
    }

    const newUser = await User.create({ name, email, password });
    const token = createAccessToken(newUser);

    const userObj = newUser.toObject();
    delete userObj.password;

    return res.status(201).json({
      success: true,
      data: {
        user: userObj,
        token
      }
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: "Error while signing up.", error: error.message });
  }
};

const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    return res.status(200).json({ success: true, user });
  } catch (error) {
    return res.status(400).json({ success: false, message: "Error while fetching user.", error: error.message });
  }
};

export { Login, SignUp, getCurrentUser };
