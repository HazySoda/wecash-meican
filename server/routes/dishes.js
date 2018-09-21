const Joi = require('joi')
const { paginationDefine } = require('../utils/router-helper')
const models = require('../models')

const GROUP_NAME = 'dishes'

module.exports = [
  {
    method: 'GET',
    path: `/${GROUP_NAME}`,
    config: {
      tags: ['api', GROUP_NAME],
      description: '获取菜品列表',
      notes: '获取菜品列表',
      auth: false,
      validate: {
        query: {
          ...paginationDefine,
          shopId: Joi.number().integer().min(1).required().description('店铺ID')
        }
      }
    },
    handler: async (req, h) => {
      const { currentPage, pageSize, shopId } = req.query
      const { rows: results, count: total } = await models.dishes.findAndCountAll({
        limit: pageSize,
        offset: (currentPage - 1) * pageSize,
        where: {
          shop_id: shopId
        }
      })
      req.total = total
      return results
    }
  }
]
