const { Water } = require("../../models");

const waterChange = async (req, res) => {
  const { _id: owner } = req.user;
  const { water, date } = req.body;

  // Проверяем, существует ли объект с указанной датой
  const existingWater = await Water.findOne({
    owner,
    "waterAndDate.date": date,
  });

  if (existingWater) {
    // Если объект существует, приплюсовываем воду
    const updatedWater = await Water.findOneAndUpdate(
      { owner, "waterAndDate.date": date },
      { $inc: { "waterAndDate.$.water": water } },
      { new: true }
    );
    const addedWater = updatedWater.waterAndDate.find(
      (item) => item.date === date
    );
    res.status(200).json({ data: addedWater });
  } else {
    // Если объект не существует, создаем новый
    const newWater = await Water.findOneAndUpdate(
      { owner },
      { $push: { waterAndDate: { water, date } } },
      { new: true, upsert: true }
    );

    // Находим объект в массиве с нужной датой
    const addedWater = newWater.waterAndDate.find((item) => item.date === date);

    res.status(201).json({ data: addedWater });
  }
};

module.exports = waterChange;
