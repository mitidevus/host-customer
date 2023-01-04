module.exports = {
  type: 'object',
  properties: {
    fullname: { type: 'string', 'minLength': 1 },
    email: { type: 'string', format: 'email' },
    address: { type: 'string', 'minLength': 1 },
    password: { type: 'string', 'minLength': 6 },
    re_password: { type: 'string', 'minLength': 1 },
  },
  required: ['fullname', 'email', 'address', 'password', 're_password'],
  additionalProperties: false,
};