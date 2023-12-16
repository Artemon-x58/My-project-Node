const { currentDate } = require("../helpers");
const { Diary } = require("../models");

const today = currentDate();

const initialMacronutrientsData = {
  title: "",
  calories: 0,
  carbohydrates: 0,
  protein: 0,
  fat: 0,
  date: today,
};

const initialDiary = async (userId) => {
  await Diary.create({
    breakfast: initialMacronutrientsData,
    dinner: initialMacronutrientsData,
    lunch: initialMacronutrientsData,
    snack: initialMacronutrientsData,
    owner: userId,
  });
};

module.exports = initialDiary;
