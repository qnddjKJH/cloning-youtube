import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import passport from "passport";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import routes from "./routes";
import { localsMiddleware } from "./middlewares";

import "./passport";

const app = express();

app.use(helmet());
app.set("view engine", "pug"); 
app.use("/uploads", express.static("uploads")); // directory 에서 file 을 보내주는 middleware
app.use("/static", express.static("static"));
app.use(cookieParser());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan("dev"));
app.use(passport.initialize());
app.use(passport.session()); // session 즉 쿠키를 잘 작동할려면 express-session 도 필요

app.use(localsMiddleware);

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

export default app;
