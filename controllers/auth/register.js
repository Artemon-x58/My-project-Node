const { User } = require("../../models");
const { HttpError } = require("../../helpers");
const gravatar = require("gravatar");
const bcrypt = require("bcrypt");
const { nanoid } = require("nanoid");
const { sendEmail } = require("../../services/email");
const { initialWaterValue } = require("../../water");
const { initialCaloriesValue } = require("../../calories");

require("dotenv").config();

const { BASE_URL } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email already in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationToken = nanoid();
  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationToken,
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

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/users/verify/${verificationToken}">Click verify email</a>`,
  };
  await sendEmail(verifyEmail);

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

module.exports = register;
