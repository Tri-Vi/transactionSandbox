
module.exports = (sequelize, Sequelize) => {
  const Album = sequelize.define("album", {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    },
    name: {
      type: Sequelize.STRING
    },
    year: {
      type: Sequelize.INTEGER
    },
    internal_id: {
      type: Sequelize.STRING
    }
  });
  return Album;
}

