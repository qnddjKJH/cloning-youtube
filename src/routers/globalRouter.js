import express from "express";
import routes from "../routes";
import passport from "passport";
import { home, search } from "../controllers/videoContreoller";
import { getJoin, logout, postJoin, postLogin, getLogin, githubLogin, postGithubLogIn, getMe } from "../controllers/userController";
import { onlyPrivate, onlyPublic } from "../middlewares";

const globalRouter = express.Router();

globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin);

globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);

globalRouter.get(routes.home, home);
globalRouter.get(routes.search, search);
globalRouter.get(routes.logout, onlyPrivate, logout);

globalRouter.get(routes.github, githubLogin);
globalRouter.get(routes.githubCallback, 
    passport.authenticate('github', { failureRedirect: '/login' }), 
    postGithubLogIn
);

globalRouter.get(routes.me, getMe);


export default globalRouter;