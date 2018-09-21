'use strict'

const timestamps = {
  created_at: new Date(),
  updated_at: new Date()
}

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'dishes',
      [
        {
          id: 1,
          name: '黑椒牛柳饭',
          shop_id: 1,
          shop_name: '永和大王 (银河Soho店)',
          rate: 4,
          ...timestamps
        },
        {
          id: 2,
          name: '酥嫩鸡排饭',
          shop_id: 1,
          shop_name: '永和大王 (银河Soho店)',
          rate: 5,
          ...timestamps
        },
        {
          id: 3,
          name: '猪肉酸菜饺子',
          shop_id: 2,
          shop_name: '曲家香饺子',
          rate: 3,
          ...timestamps
        },
        {
          id: 4,
          name: '猪肉茴香饺子',
          shop_id: 2,
          shop_name: '曲家香饺子',
          rate: 2,
          ...timestamps
        },
        {
          id: 5,
          name: '曲家香套餐',
          shop_id: 2,
          shop_name: '曲家香饺子',
          rate: 5,
          ...timestamps
        }
      ], {}
    )
  },
  down: (queryInterface, Sequelize) => {
    const { Op } = Sequelize
    return queryInterface.bulkDelete('dishes', {
      id: {
        [Op.in]: [1, 2, 3, 4, 5]
      }
    }, {})
  }
}
