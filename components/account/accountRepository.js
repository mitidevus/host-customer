const db = require('../../db');

exports.updateProfile = async (id, fullname, address, avatar) => {
    await db.connection.execute('update user set fullname = ?, address = ?, avatar = ? where user_Id = ?', [fullname, address, avatar, id]);
};

exports.getAccountInfoById = async (userId) => {
    const result = await db.connection.execute('select * from user where user_Id = ? limit 1', [userId]);
    return result[0] && result[0][0];
};

exports.updatePassword = async (id, newPassword) => {
    await db.connection.execute('update user set password = ? where user_Id = ?', [newPassword, id]);
};

exports.getUserPasswordById = async (userId) => {
    const result = await db.connection.execute('select password from user where user_Id = ? limit 1', [userId]);
    return result[0] && result[0][0];
};