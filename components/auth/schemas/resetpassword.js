module.exports = {
    type: 'object',
    properties: {
        id: { type: 'string', 'minLength': 1 },
        new_password: { type: 'string', 'minLength': 6 },
        confirm_password: { type: 'string', 'minLength': 1 },
    },
    required: ['id', 'new_password', 'confirm_password'],
    additionalProperties: false,
};