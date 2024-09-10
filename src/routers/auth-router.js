import { Router } from "express";

import ctrlWrapper from "../utils/ctrlWrapper.js";
import validateBody from "../utils/validateBody.js";

import {userSignupSchema, userSigninSchema} from "../validation/user-schemas.js";

import { signupController, signinController, refreshController, signoutController } from "../controllers/auth-controllers.js";

const authRouter = Router();

authRouter.post("/register", validateBody(userSignupSchema), ctrlWrapper(signupController));

authRouter.post("/login", validateBody(userSigninSchema), ctrlWrapper(signinController));

authRouter.post("/refresh", ctrlWrapper(refreshController));

authRouter.post("/logout", ctrlWrapper(signoutController));

export default authRouter;  