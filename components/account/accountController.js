const Ajv = require("ajv");
const addFormats = require("ajv-formats");
const changePasswordSchema = require("./schemas/changePassword");
const ajv = new Ajv();
addFormats(ajv);

const bcrypt = require("bcryptjs");

const createError = require("http-errors");
const qs = require("qs");

const accountService = require("./accountService");

exports.showAccountInfo = async (req, res) => {
    const userId = req.user.user_Id;
    console.log("accountController userId: ", userId);
    const user = await accountService.getAccountInfoById(userId);
    console.log("accountController user: ", user);
    if (!user) throw createError(404, "User not found!");
    res.render("account/page", { user: user });
};

exports.showEditProfile = async (req, res) => {
    res.render("account/edit_profile");
};

exports.editProfile = async (req, res) => {
    const { id, fullname, address, avatar } = req.body;
    // console.log("id", id);
    // console.log("fullname", fullname);
    // console.log("address", address);
    // console.log("avatar", avatar);
    await accountService.updateProfile(id, fullname, address, avatar);
    req.session.passport.user.fullname = fullname;
    req.session.passport.user.avatar = avatar;
    res.redirect(`/account/userInfo`);
};

exports.showChangePassword = async (req, res) => {
    res.render("account/change_password");
};

exports.changePassword = async (req, res) => {
    // syntax validation
    if (!ajv.validate(changePasswordSchema, req.body)) {
        res.render("account/change_password", { error: "Invalid input!" });
        return;
    }

    const { id, oldPassword, newPassword, confirm_password } = req.body;

    if (newPassword !== confirm_password) {
        res.render("account/change_password", { error: "Confirm password does not match!" });
        return;
    }

    try {
        const userPassword = await accountService.getUserPasswordById(id); // Object
        if (!userPassword) {
            res.render("account/change_password", { error: "User not found!" });
            return;
        }
        // console.log("userPassword: ", userPassword.password);
        // console.log("oldPassword", oldPassword);

        let temp = await bcrypt.compare(oldPassword, userPassword.password);
        if (!temp) {
            res.render("account/change_password", { error: "The old password is incorrect!" });
            return;
        }

        await accountService.updatePassword(id, newPassword);

        res.redirect(`/account/userInfo`);
    } catch (e) {
        console.log("error: ", e.message);
        res.render("account/change_password", { error: e.message });
        return;
    }
};
