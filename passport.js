import passport from "passport";
import GitHubStrategy from "passport-github";
import { githubLoginCallback } from "./controllers/userController";
import User from "./models/User";
import routes from "./routes";

// strategy 설정 (전략설정 "옵션같은것")
passport.use(User.createStrategy('local'));

// github 로그인은 passport 의 passport-github 사용
// 사용법은 passport-github strategy 참조 ( passporjs.org )
// 초보자는 docs 꼭 보기
passport.use(new GitHubStrategy({
        clientID: process.env.GITHUB_CID,
        clientSecret: process.env.GITHUB_SECRET,
        callbackURL: `http://localhost:4000${routes.githubCallback}`
    }, githubLoginCallback)
);

// passport-local-mongoose 로 간단하게 설정...
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());