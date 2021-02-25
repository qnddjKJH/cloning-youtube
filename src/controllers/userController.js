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

export const githubLogin = passport.authenticate("github");

// passport-github sttrategy 설정에 다 나옴
// 니콜라스는 사용하지 않는 parameter 를 _ __ ___ 로 치환하여 사용함 팁
// 근데 난 그냥 둘려고...별로 상관없어 보임
export const githubLoginCallback = async (accessToken, refreshToken, profile, cb) => {
    // User.findOne({email}) DB 에서 이메일 검색 중복 유저 없으면 create 있으면
    // githubId update 과정
        const {
            _json: { id, avatar_url, name, email}
        } = profile;
        try {
            const user = await User.findOne({ email });
            if( user ) {
                user.githubId = id;
                user.save();
                return cb(null, user);
            }
            const newUser = await User.create({
                email : email,
                name : name,
                githubId : id,
                avatarUrl : avatar_url
            });
            return cb(null, newUser);
        } catch (error) {
            return cb(error);
        }
};

export const postGithubLogIn = (req, res) => {
    res.redirect(routes.home);
};

export const logout = (req, res) => {
    // passport 에서 req.logout() 만 쓰면 알아서 다해줌
    req.logout();
    res.redirect(routes.home);
};

export const getMe = (req, res) => {
    res.render("userDetail", { pageTitle: "User Detail", user: req.user});
};

// users
export const userDetail = async (req, res) => {
    const { params: { id }} = req;
    try {
        const user = await User.findById(id).populate("videos");
        console.log(user);
        res.render("userDetail", { pageTitle: "User Detail", user});
    } catch (error) {
        res.redirect(routes.home);
    }
};

export const getEditProfile = (req, res) => res.render("editProfile", {pageTitle: "Edit Profile"});

export const postEditProfile = async (req, res) => {
    const {
        body: { name, email },
        file
    } = req;
    try {
        await User.findByIdAndUpdate(req.user.id, {
            name,
            email,
            avatarUrl : file ? file.location : req.user.avatarUrl
        });
        res.redirect(routes.me);
    } catch (error) {
        res.redirect(routes.editProfile);
    }
};

export const getChangePassword = (req, res) => res.render("changePassword", {pageTitle: "Change Password"});

export const postChangePassword = async (req, res) => {
    const {
        body: { oldPassword, newPassword, newPassword1 }
    } = req;
    try {
        if(newPassword !== newPassword1) {
            res.status(400);
            res.redirect(`/users/${routes.changePassword}`);
            console.log("if");
            return
        } else {
            await req.user.changePassword(oldPassword, newPassword);
            res.redirect(routes.me);
        }
    } catch (error) {
        res.status(400);
        res.redirect(`/users/${routes.changePassword}`);
    }
};