const { ctrlWrapper } = require("../../helpers");
const waterEdit = require("./waterEdit");
const weightEdit = require("./weightEdit");

module.exports = {
  waterEdit: ctrlWrapper(waterEdit),
  weightEdit: ctrlWrapper(weightEdit),
};
