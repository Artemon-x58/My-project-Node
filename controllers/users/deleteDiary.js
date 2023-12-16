const { deleteCaloriesToday } = require("../../calories");
const sumObjectProperties = require("../../calories/sumObjectProperties");
const { currentDate } = require("../../helpers");
const { Diary } = require("../../models");

const deleteDiary = async (req, res) => {
  const { id: owner } = req.user;
  const { meals } = req.body;

  const today = currentDate();

  const existingDiary = await Diary.findOneAndUpdate(
    { owner },
    {
      $set: {
        [meals]: {
          title: 0,
          calories: 0,
          carbohydrates: 0,
          protein: 0,
          fat: 0,
          date: today,
        },
      },
    }
  ).exec();

  res.json({ existingDiary });

  const { calories, carbohydrates, protein, fat } = sumObjectProperties(
    existingDiary[meals]
  );

  deleteCaloriesToday(owner, calories, carbohydrates, protein, fat);
};

module.exports = deleteDiary;
