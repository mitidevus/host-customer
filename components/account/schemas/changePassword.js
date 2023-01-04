module.exports = {
    type: 'object',
    properties: {
        id: { type: 'string', 'minLength': 1 },
        oldPassword: { type: 'string', 'minLength': 6 },
        newPassword: { type: 'string', 'minLength': 6 },
        confirm_password: { type: 'string', 'minLength': 1 },
    },
    required: ['id', 'oldPassword', 'newPassword', 'confirm_password'],
    additionalProperties: false,
};