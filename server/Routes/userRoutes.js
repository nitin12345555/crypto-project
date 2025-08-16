import express from "express";
import { protect } from "../middleware/auth.js";
import { registerUser, loginUser } from "../controllers/userController.js";

const userRouter = express.Router();


userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);



export default userRouter;
