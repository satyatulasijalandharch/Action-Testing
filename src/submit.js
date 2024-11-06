const fetch = require("node-fetch").default;
const getMessage = require("./message");
const { getInput, info, setFailed } = require("@actions/core");
const { REQUIRED_INPUTS } = require("./constants");

const submitNotification = async () => {
  try {
    const webhookBody = JSON.stringify(await getMessage());
    const isDebug = getInput("DEBUG", { required: REQUIRED_INPUTS.DEBUG }) === "true";
    
    isDebug && console.log(`Final webhook body before submission: ${webhookBody}`);

    const response = await fetch(
      getInput("WEBHOOK_URI", { required: REQUIRED_INPUTS.WEBHOOK_URI }), 
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: webhookBody,
      }
    );

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    
    info("Webhook submitted successfully");
    return response;
  } catch (error) {
    const errorMsg = `Error in submitNotification: ${error.message}`;
    console.error(errorMsg);
    setFailed(errorMsg);
    throw error;
  }
};

module.exports = submitNotification;
