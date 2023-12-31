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
const statisticsSchema = require("./statistics");
const dairyUpdateSchema = require("./updateDiary");

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
  statisticsSchema,
  dairyUpdateSchema,
};
