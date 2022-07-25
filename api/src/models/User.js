const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("user", {
    name: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
  });
};