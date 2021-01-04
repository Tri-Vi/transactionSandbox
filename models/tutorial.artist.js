module.exports = (sequelize, Sequelize) => {
  const Artist = sequelize.define("artist", {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    },
    name: {
      type: Sequelize.STRING
    }
  });
  return Artist;
}
