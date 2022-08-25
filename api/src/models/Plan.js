const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("plan", {
    id: {
      type:  DataTypes.STRING,
      primaryKey: true,
    },
    currency: {
      type: DataTypes.ENUM(
        "usd",
      ),
    },
    amount: {
    type:  DataTypes.INTEGER,
    },
    product: {
      type: DataTypes.STRING,
    },
    interval: {
        type: DataTypes.ENUM(
            "day", 
            "week",
            "month", 
            "year", 
        )
    }
  });
};