const { User } = require("../../models");
const { HttpError } = require("../../helpers");
const gravatar = require("gravatar");
const bcrypt = require("bcrypt");
const { initialWaterValue } = require("../../water");
const { initialCaloriesValue } = require("../../calories");
const { initialWeightValue } = require("../../weight");

require("dotenv").config();

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email already in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
  });
  await initialWaterValue(newUser.id, newUser.weight, newUser.kef);
  await initialCaloriesValue(
    newUser.id,
    newUser.gender,
    newUser.weight,
    newUser.height,
    newUser.kef,
    newUser.age,
    newUser.yourGoal
  );
  await initialWeightValue(newUser.id, newUser.weight);

  res.status(201).json({
    code: 201,
    user: {
      email: newUser.email,
    },
  });
};

module.exports = register;
