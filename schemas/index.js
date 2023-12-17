const {
  registerAndLoginSchema,
  loginSchema,
  emailSchema,
  updateUserSchema,
} = require("./users");
const waterSchema = require("./water");
const weightSchema = require("./weight");
const goalSchema = require("./goal");
const addDairySchema = require("./addDiary");
const deleteDairySchema = require("./deleteDairy");
const updateDiarySchema = require("./updateDiary");

module.exports = {
  registerAndLoginSchema,
  emailSchema,
  waterSchema,
  loginSchema,
  weightSchema,
  updateUserSchema,
  goalSchema,
  addDairySchema,
  deleteDairySchema,
  updateDiarySchema,
};
