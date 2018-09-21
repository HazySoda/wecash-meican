'use strict'

const timestamps = {
  created_at: new Date(),
  updated_at: new Date()
}

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'comments',
      [
        {
          id: 1,
          user_id: 1,
          user_name: '腰花',
          user_avatar: 'http://www.logoquan.com/upload/list/20180421/logoquan15259400209.PNG',
          dish_id: 1,
          comment: '好吃！！！',
          rate: 4,
          ...timestamps
        },
        {
          id: 2,
          user_id: 2,
          user_name: '土拨鼠',
          user_avatar: 'http://www.logoquan.com/upload/list/20180421/logoquan15259400209.PNG',
          dish_id: 1,
          comment: '啊！！！！！！！！',
          rate: 4,
          ...timestamps
        },
        {
          id: 3,
          user_id: 1,
          user_name: '腰花',
          user_avatar: 'http://www.logoquan.com/upload/list/20180421/logoquan15259400209.PNG',
          dish_id: 5,
          comment: '饺子太好吃！！！',
          rate: 5,
          ...timestamps
        },
        {
          id: 4,
          user_id: 1,
          user_name: '腰花',
          user_avatar: 'http://www.logoquan.com/upload/list/20180421/logoquan15259400209.PNG',
          dish_id: 2,
          comment: '永和大王都好吃！！！',
          rate: 4,
          ...timestamps
        },
        {
          id: 5,
          user_id: 2,
          user_name: '土拨鼠',
          user_avatar: 'http://www.logoquan.com/upload/list/20180421/logoquan15259400209.PNG',
          dish_id: 3,
          comment: '我觉得不行。',
          rate: 3,
          ...timestamps
        }
      ], {}
    )
  },
  down: (queryInterface, Sequelize) => {
    const { Op } = Sequelize
    return queryInterface.bulkDelete('comments', {
      id: {
        [Op.in]: [1, 2, 3, 4, 5]
      }
    }, {})
  }
}
