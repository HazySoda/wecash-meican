'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.createTable(
      'dishes',
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
        shop_id: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        shop_name: {
          type: Sequelize.STRING,
          allowNull: false
        },
        rate: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        isActive: {
          type: Sequelize.BOOLEAN,
          defaultValue: true
        },
        created_at: Sequelize.DATE,
        updated_at: Sequelize.DATE
      }
    )
  },
  down: queryInterface => {
    queryInterface.dropTable('dishes')
  }
}
