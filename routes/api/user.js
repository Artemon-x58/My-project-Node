const express = require("express");
const { authenticate, validateUsers } = require("../../middlewares");
const schemas = require("../../schemas");
const ctrl = require("../../controllers");
const router = express.Router();

router.put(
  "/update",
  authenticate,
  validateUsers(schemas.updateUserSchema),
  ctrl.users.updateUserSetting
);

router.put(
  "/goal",
  authenticate,
  validateUsers(schemas.goalSchema),
  ctrl.users.goalEdit
);

router.post(
  "/food-intake",
  authenticate,
  validateUsers(schemas.addDairySchema),
  ctrl.users.addDiary
);

router.put(
  "/food-intake:id",
  authenticate,
  validateUsers(schemas.updateDiarySchema),
  ctrl.users.updateDiary
);

router.delete(
  "/food-intake",
  authenticate,
  validateUsers(schemas.deleteDairySchema),
  ctrl.users.deleteDiary
);

router.post(
  "/water-intake",
  authenticate,
  validateUsers(schemas.waterSchema),
  ctrl.users.waterEdit
);
router.delete("/water-intake", authenticate, ctrl.users.waterDelete);

router.post(
  "/edit-weight",
  authenticate,
  validateUsers(schemas.weightSchema),
  ctrl.users.weightEdit
);

module.exports = router;
