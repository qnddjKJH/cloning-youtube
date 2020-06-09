import routes from "../routes";

// globals
export const getJoin = (req, res) =>{
    res.render("join", {pageTitle: "Join"});
};

export const postJoin = (req, res) =>{
    const {
        body: {name, email, password, password2}
    } = req;

    if (password !== password2) {
        res.status(400);
        res.render("join", {pageTitle: "Join"});
    } else {
        // To Do: Resister User
        // To Do: Log in User
        res.redirect(routes.home);
    }

};

export const getLogin = (req, res) => {
    res.render("login", {pageTitle: "Log In"});
}
export const postLogin = (req, res) => {
    res.redirect(routes.home);
}

export const logout = (req, res) => {
    // To Do: process Log Out
    res.redirect(routes.home);
}


// users
export const users = (req, res) => res.render("users", {pageTitle: "Users"});
export const userDetail = (req, res) => res.render("userDetail", {pageTitle: "User Detail"});
export const editProfile = (req, res) => res.render("editProfile", {pageTitle: "Edit Profile"});
export const changePassword = (req, res) => res.render("changePassword", {pageTitle: "Change Password"});
