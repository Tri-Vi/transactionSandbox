
module.exports = (sequelize, Sequelize) => {
  const Album = sequelize.define("album", {
    name: {
      type: Sequelize.STRING
    },
    year: {
      type: Sequelize.INTEGER
    },
    internal_id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    }
  });
  return Album;
}

