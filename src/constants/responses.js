const response = (ctx, message, code) => {
  ctx.body = message;
  ctx.response.status = code;
};

module.exports = { response };
