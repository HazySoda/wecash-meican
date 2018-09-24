'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.createTable(
      'comments',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        user_id: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        user_name: {
          type: Sequelize.STRING,
          allowNull: false
        },
        user_avatar: {
          type: Sequelize.STRING,
          allowNull: false
        },
        dish_id: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        comment: {
          type: Sequelize.STRING,
          allowNull: false
        },
        rate: {
          type: Sequelize.DECIMAL(2, 1),
          allowNull: false
        },
        created_at: Sequelize.DATE,
        updated_at: Sequelize.DATE
      }
    )
  },
  down: queryInterface => {
    queryInterface.dropTable('comments')
  }
}
