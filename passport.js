import passport from "passport";
import User from "./models/User";

// strategy 설정 (전략설정 "옵션같은것")
passport.use(User.createStrategy('local'));

// passport-local-mongoose 로 간단하게 설정...
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());