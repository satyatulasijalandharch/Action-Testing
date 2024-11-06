const { setFailed } = require("@actions/core");

module.exports.run = async () => {
  try {
    await require("./submit")();
  } catch ({ message }) {
    setFailed(message);
  }
};
