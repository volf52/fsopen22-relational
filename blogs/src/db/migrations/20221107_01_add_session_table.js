const { DataTypes } = require("sequelize")

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable(
      "sessions",
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: { model: "users", key: "id" },
        },
        token: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        expires_at: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        created_at: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        updated_at: {
          type: DataTypes.DATE,
          allowNull: false,
        },
      },
      {
        hooks: {
          beforeCreate: (session) => {
            session.created_at = new Date()
            session.updated_at = new Date()
          },
          beforeUpdate: (session) => {
            session.updated_at = new Date()
          },
        },
      },
    )
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable("sessions")
  },
}
