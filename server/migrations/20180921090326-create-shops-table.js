'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.createTable(
      'shops',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false
        },
        type: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        dishes_count: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        rate: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        created_at: Sequelize.DATE,
        updated_at: Sequelize.DATE
      }
    )
  },
  down: queryInterface => {
    queryInterface.dropTable('shops')
  }
}
