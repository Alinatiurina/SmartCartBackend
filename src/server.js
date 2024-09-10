import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import pino from "pino-http";
import env from "./utils/env.js";
import contactRouter from "./routers/contacts.js";
import notFoundHandler from "./middlewares/notFound.js";
import errorHandler from "./middlewares/errorHandler.js";
import authRouter from "./routers/auth-router.js";

const port = env("PORT", "3000");

const setupServer = ()=> {
    const app = express();

    const logger = pino({
        transport: {
            target: "pino-pretty"
        }
    });

    app.use(logger);
    app.use(cors());
    app.use(cookieParser())
    app.use(express.json());
    app.use("/auth", authRouter);
    app.use("/contacts", contactRouter);

    app.use(notFoundHandler);
    app.use(errorHandler);
    app.listen(port, () => console.log(`Server running on ${port} PORT`));
};

export default setupServer;