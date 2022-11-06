const { sequelize } = require("../db")
const { Model, DataTypes } = require("sequelize")

class Blog extends Model {}

Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1991,
        lessThanCurrentYear(value) {
          if (value > new Date().getFullYear()) {
            throw new Error("Year cannot be in the future")
          }
        },
      },
    },
  },
  {
    sequelize,
    modelName: "blog",
    timestamps: true,
    underscored: true,
  },
)

module.exports = { Blog }
