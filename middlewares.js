import multer from "multer";
import routes from "./routes";

const multerVideo = multer({ dest: "uploads/videos/" });
const multerAvatar = multer({ dest: "uploads/avatars/" });
// 서버에 저장될 경로.
// /upload/videos/ 로 경로를 지정하면 내 컴퓨터의 root directory 에 만들어지니 주의

export const localsMiddleware = (req, res, next) => {
    res.locals.siteName = "WeTube"
    res.locals.routes = routes;
    res.locals.loggedUser = req.user || null
    // passport 가 login 시 serialize, deserialize 등의 기능을 다 지원
    // 또한 user 가 담긴 object 요청에도 올려준다
    next();
};

export const onlyPublic = (req, res, next) => {
    if(req.user) {
        res.redirect(routes.home);
    } else {
        next();
    }
};

export const onlyPrivate = (req, res, next) => {
    if(req.user) {
        next()
    } else {
        res.redirect(routes.home);
    }
}

export const uploadVideo = multerVideo.single("videoFile");
export const uploadAvatar = multerAvatar.single("avatar");