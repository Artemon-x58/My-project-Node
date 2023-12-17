const { addCaloriesToday } = require("../../calories");
const { currentDate } = require("../../helpers");
const { Diary } = require("../../models");

const addDiary = async (req, res) => {
  const { id: owner } = req.user;
  const today = currentDate();

  const entries = req.body;

  const results = [];

  for (const entry of entries) {
    const { meals, title, calories, carbohydrates, protein, fat } = entry;

    const existingDiary = await Diary.findOneAndUpdate(
      { owner },
      {
        $push: {
          [meals]: {
            title,
            calories,
            carbohydrates,
            protein,
            fat,
            date: today,
          },
        },
      },
      { new: true }
    ).exec();

    addCaloriesToday(owner, calories, carbohydrates, protein, fat);

    console.log(existingDiary[meals]);
    res.json({ code: 201, existingDiary });
    results.push({ existingDiary });
  }
};

module.exports = addDiary;
