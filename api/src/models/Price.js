const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("price", {
    id: {
      type:  DataTypes.STRING,
      primaryKey: true,
      
    },
    currency: {
      type: DataTypes.STRING,
    },
    unit_amount: {
    type:  DataTypes.INTEGER,
    },
    product: {
      type: DataTypes.STRING,
    },
  });
};