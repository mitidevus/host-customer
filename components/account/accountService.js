const bcrypt = require('bcryptjs');
const accountRepository = require('./accountRepository');

exports.updateProfile = async (id, fullname, address, avatar) => {
    return await accountRepository.updateProfile(id, fullname, address, avatar);
};

exports.getAccountInfoById = async (userId) => {
    const user = await accountRepository.getAccountInfoById(userId);
    if (!user) return null;
    return user;
};

exports.updatePassword = async (id, newPassword) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newPassword, salt);
    return await accountRepository.updatePassword(id, hash);
};

exports.getUserPasswordById = async (userId) => {
    const userPassword = await accountRepository.getUserPasswordById(userId);
    if (!userPassword) return null;
    return userPassword;
};