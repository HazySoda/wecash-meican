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
  }
]
