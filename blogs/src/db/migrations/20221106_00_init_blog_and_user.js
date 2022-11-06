const { DataTypes } = require("sequelize")

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable(
      "users",
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
        created_at: DataTypes.DATE,
        updated_at: DataTypes.DATE,
      },
      {
        hooks: {
          beforeCreate: (user) => {
            user.created_at = new Date()
            user.updated_at = new Date()
          },
          beforeUpdate: (user) => {
            user.updated_at = new Date()
          },
        },
      },
    )

    await queryInterface.createTable(
      "blogs",
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
        created_at: DataTypes.DATE,
        updated_at: DataTypes.DATE,
      },
      {
        hooks: {
          beforeCreate: (user) => {
            user.created_at = new Date()
            user.updated_at = new Date()
          },
          beforeUpdate: (user) => {
            user.updated_at = new Date()
          },
        },
      },
    )

    await queryInterface.addColumn("blogs", "user_id", {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      onUpdate: "CASCADE",
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable("blogs")
    await queryInterface.dropTable("users")
  },
}
