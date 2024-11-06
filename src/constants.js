const STATUS_COLORS = {
  success: "00FF00",
  failure: "FF0000",
  failed: "FF0000",
  timed_out: "FF0000",
  cancelled: "FFA500",
  skipped: "FFA500",
  action_required: "0000FF",
  default: "808080",
};

const REQUIRED_INPUTS = {
  GITHUB_TOKEN: true,
  WEBHOOK_URI: true,
  DEBUG: false,
};

module.exports = {
  STATUS_COLORS,
  REQUIRED_INPUTS,
};
