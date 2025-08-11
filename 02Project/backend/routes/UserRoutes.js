import express from "express";
import { Login, SignUp, getCurrentUser } from "../controllers/userController.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const UserRouter = express.Router();

UserRouter.post("/login", Login);
UserRouter.post("/signup", SignUp);
UserRouter.post("/logout", verifyToken, getCurrentUser);

export default UserRouter;
