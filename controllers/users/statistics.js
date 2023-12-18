const { getMonthNumber } = require("../../helpers");
const { Calories } = require("../../models");

const statistics = async (req, res) => {
  const { month } = req.body;
  const { id: owner } = req.user;

  const monthNumber = getMonthNumber(month);

  // Построение строки регулярного выражения для поиска месяца в формате "гггг.мм."
  const regexString = `\\.${monthNumber.toString().padStart(2, "0")}\\.`;
  const regex = new RegExp(regexString);

  const calories = await Calories.find({
    owner,
    "caloriesAndDate.date": { $regex: regex },
  });

  // Далее обрабатываем результаты запроса
  res.json({ calories });
};

module.exports = statistics;
