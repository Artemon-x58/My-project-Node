const { ctrlWrapper } = require("../../helpers");
const waterEdit = require("./waterEdit");
const updateUserSetting = require("./updateUserSetting");
const weightEdit = require("./weightEdit");
const waterDelete = require("./waterDelete");
const goalEdit = require("./goalEdit");
const addDiary = require("./addDiary");
const deleteDiary = require("./deleteDiary");

module.exports = {
  waterEdit: ctrlWrapper(waterEdit),
  updateUserSetting: ctrlWrapper(updateUserSetting),
  weightEdit: ctrlWrapper(weightEdit),
  waterDelete: ctrlWrapper(waterDelete),
  goalEdit: ctrlWrapper(goalEdit),
  addDiary: ctrlWrapper(addDiary),
  deleteDiary: ctrlWrapper(deleteDiary),
};
