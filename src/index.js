const { setFailed } = require("@actions/core");

module.exports.run = async () => {
  try {
    console.log('Starting submission process...');
    await require("./submit")();
    console.log('Submission completed successfully');
    return;
  } catch (error) {
    console.error('Error during submission:', error);
    setFailed(error.message);
  }
};
