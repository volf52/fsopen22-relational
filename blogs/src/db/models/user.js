const { sequelize } = require("../db")
const { Model, DataTypes } = require("sequelize")

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    disabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "user",
    underscored: true,
    timestamps: true,
    defaultScope: {
      where: {
        disabled: false,
      },
    },
    scopes: {
      disabled: {
        where: {
          disabled: true,
        },
      },
      active: {
        where: {
          disabled: false,
        },
      },
    },
  },
)

module.exports = { User }
