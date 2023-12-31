const { currentDate, HttpError } = require("../../helpers");
const { Weight, User, Water, Calories } = require("../../models");
const { updateWaterValue } = require("../../water");
const { updateCalories } = require("../../calories");

const weightEdit = async (req, res) => {
  const { id: owner } = req.user;
  const { weight } = req.body;

  const today = currentDate();

  const user = await User.findByIdAndUpdate(
    owner,
    { weight },
    {
      new: true,
    }
  ).exec();
  if (!user) {
    throw HttpError(404);
  }
  updateCalories(
    user.id,
    user.gender,
    user.weight,
    user.height,
    user.kef,
    user.age,
    user.yourGoal
  );
  updateWaterValue(user.id, user.weight, user.kef);

  const existingWeight = await Weight.findOne({
    owner,
    "weightAndDate.date": today,
  }).exec();

  if (!existingWeight) {
    throw HttpError(404);
  }

  if (existingWeight) {
    const updatedWeight = await Weight.findOneAndUpdate(
      { owner, "weightAndDate.date": today },
      { $set: { "weightAndDate.$.weight": weight } },
      { new: true }
    ).exec();
    const newWeight = updatedWeight.weightAndDate.find(
      (item) => item.date === today
    );
    const { recommendedWater } = await Water.findOne({ owner }).exec();
    const { recommendedCalories } = await Calories.findOne({ owner }).exec();
    res
      .status(200)
      .json({ data: newWeight, recommendedCalories, recommendedWater });
  } else {
    const updatedWeight = await Weight.findOneAndUpdate(
      { owner },
      { $push: { weightAndDate: { weight, date: today } } },
      { new: true, upsert: true }
    ).exec();
    const { recommendedWater } = await Water.findOne({ owner }).exec();
    const { recommendedCalories } = await Calories.findOne({ owner }).exec();

    const newWeight = updatedWeight.weightAndDate.find(
      (item) => item.date === today
    );

    res
      .status(201)
      .json({ data: newWeight, recommendedCalories, recommendedWater });
  }
};

module.exports = weightEdit;
