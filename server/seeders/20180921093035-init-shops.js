'use strict'

const timestamps = {
  created_at: new Date(),
  updated_at: new Date()
}

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'shops',
      [
        {
          id: 1,
          name: '永和大王 (银河Soho店)',
          type: 2,
          dishes_count: 2,
          rate: 4,
          ...timestamps
        },
        {
          id: 2,
          name: '曲家香饺子',
          type: 1,
          dishes_count: 3,
          rate: 5,
          ...timestamps
        }
      ], {}
    )
  },
  down: (queryInterface, Sequelize) => {
    const { Op } = Sequelize
    return queryInterface.bulkDelete('shops', {
      id: {
        [Op.in]: [1, 2]
      }
    }, {})
  }
}
