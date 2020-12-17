module.exports = (sequelize, Sequelize) => {
  const Album = sequelize.define("album", {
    name: {
      type: Sequelize.STRING
    },
    year: {
      type: Sequelize.INTEGER
    }
  });
  return Album;
}
