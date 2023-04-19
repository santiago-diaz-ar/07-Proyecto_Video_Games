const { DataTypes, Sequelize } = require("sequelize");

module.exports = (Sequelize) => {
  Sequelize.define(
    "genre",
    {
      /* id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    }, */
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};
