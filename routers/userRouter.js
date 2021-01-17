import express from "express";
import routes from "../routes";
import { userDetail, getEditProfile, postEditProfile, postChangePassword, getChangePassword } from "../controllers/userController";
import { onlyPrivate, uploadAvatar } from "../middlewares";

const userRouter = express.Router();

userRouter.get(routes.editProfile, onlyPrivate, getEditProfile);
userRouter.post(routes.editProfile, onlyPrivate, uploadAvatar, postEditProfile);

userRouter.get(routes.changePassword, onlyPrivate, getChangePassword);
userRouter.post(routes.changePassword, onlyPrivate, postChangePassword);

userRouter.get(routes.userDetail(), userDetail);
// userDetail 부분이 editProfile, changePassword 부분 보다 윗줄에 있으면
// 해당 라우터 부분이 userDetail 로 인식하는 상황이 벌어짐...그래서 밑에 있어야함

export default userRouter;
