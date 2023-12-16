const { addCaloriesToday } = require("../../calories");
const { currentDate } = require("../../helpers");
const { Diary } = require("../../models");

const addDiary = async (req, res) => {
  const { id: owner } = req.user;
  const { meals, title, calories, carbohydrates, protein, fat } = req.body;
  console.log(typeof calories);
  const today = currentDate();

  // Ищем объект Diary по owner и meals
  const existingDiary = await Diary.findOneAndUpdate(
    { owner },
    {
      $push: {
        [meals]: { title, calories, carbohydrates, protein, fat, date: today },
      },
    },
    { new: true }
  ).exec();
  addCaloriesToday(owner, calories, carbohydrates, protein, fat);

  res.json({ existingDiary });
};

module.exports = addDiary;
