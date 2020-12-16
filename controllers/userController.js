import passport from "passport";
import routes from "../routes";
import User from "../models/User";

// globals
export const getJoin = (req, res) =>{
    res.render("join", {pageTitle: "Join"});
};

export const postJoin = async (req, res, next) =>{
    const {
        body: {name, email, password, password2}
    } = req;

    if (password !== password2) {
        res.status(400);
        res.render("join", {pageTitle: "Join"});
    } else {
        // 유저 등록 (DB)
        try {
            const user = await User({
                name,
                email
            });
            await User.register(user, password);
            next();
            // 이 next()는 Router 에 작성한 대로 postLogin 으로 넘김
        } catch (error) {
            console.log(error);
            res.redirect(routes.home);
        }
    }
};

export const getLogin = (req, res) => {
    res.render("login", {pageTitle: "Log In"});
}
export const postLogin = passport.authenticate('local', {
    // 실패 시, 성공 시 redirect 주소
    failureRedirect: routes.login,
    successRedirect: routes.home
});

export const logout = (req, res) => {
    // To Do: process Log Out
    res.redirect(routes.home);
}


// users
export const users = (req, res) => res.render("users", {pageTitle: "Users"});
export const userDetail = (req, res) => res.render("userDetail", {pageTitle: "User Detail"});
export const editProfile = (req, res) => res.render("editProfile", {pageTitle: "Edit Profile"});
export const changePassword = (req, res) => res.render("changePassword", {pageTitle: "Change Password"});
