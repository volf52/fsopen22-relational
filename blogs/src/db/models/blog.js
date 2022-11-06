const { Model, DataTypes } = require("sequelize");

class Blog extends Model {}

const initBlog = async (sequelize) => {
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
    },
    {
      sequelize,
      modelName: "blog",
      timestamps: false,
      underscored: true,
    }
  );

  await Blog.sync();
};

module.exports = { Blog, initBlog };
