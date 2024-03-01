const fMsg = async (res, con, message, result = []) => {
  res.json({
    success: con,
    message,
    result,
  });
};

module.exports = { fMsg };
