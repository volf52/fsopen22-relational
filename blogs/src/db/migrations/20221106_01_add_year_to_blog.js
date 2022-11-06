const { DataTypes } = require("sequelize")

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn("blogs", "year", {
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
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn("blogs", "year")
  },
}
