const Joi = require('joi')
const { paginationDefine } = require('../utils/router-helper')
const models = require('../models')

const GROUP_NAME = 'comments'

module.exports = [
  {
    method: 'GET',
    path: `/${GROUP_NAME}`,
    config: {
      tags: ['api', GROUP_NAME],
      description: '获取评价列表',
      notes: '获取评价列表',
      auth: false,
      validate: {
        query: {
          ...paginationDefine,
          dishId: Joi.number().integer().min(1).required().description('菜品ID')
        }
      }
    },
    handler: async (req, h) => {
      const { currentPage, pageSize, dishId } = req.query
      const { rows: results, count: total } = await models.comments.findAndCountAll({
        limit: pageSize,
        offset: (currentPage - 1) * pageSize,
        where: {
          dish_id: dishId
        }
      })
      req.total = total
      return results
    }
  },
  {
    method: 'POST',
    path: `/${GROUP_NAME}`,
    config: {
      tags: ['api', GROUP_NAME],
      description: '新增评价',
      notes: '新增评价',
      auth: false,
      validate: {
        payload: {
          userId: Joi.number().integer().min(1).required().description('userID'),
          userName: Joi.string().required().description('userName'),
          userAvatar: Joi.string().required().description('userAvatar'),
          dishId: Joi.number().integer().min(1).description('dishId'),
          comment: Joi.string().required().description('comment'),
          rate: Joi.number().min(0).max(5).required().description('rate')
        }
      }
    },
    handler: async (req, h) => {
      const { userId, userName, userAvatar, dishId, comment, rate } = req.payload
      await models.comments.create({
        user_id: userId,
        user_name: userName,
        user_avatar: userAvatar,
        dish_id: dishId,
        comment,
        rate
      })
      return {
        statusCode: 200,
        error: null,
        message: '操作成功!'
      }
    }
  }
]
