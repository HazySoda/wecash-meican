const Joi = require('joi')
const { paginationDefine } = require('../utils/router-helper')
const models = require('../models')

const GROUP_NAME = 'shops'

module.exports = [
  {
    method: 'GET',
    path: `/${GROUP_NAME}`,
    config: {
      tags: ['api', GROUP_NAME],
      description: '获取商家列表',
      notes: '获取商家列表',
      auth: false,
      validate: {
        query: {
          ...paginationDefine
        }
      }
    },
    handler: async (req, h) => {
      const { currentPage, pageSize } = req.query
      const { rows: results, count: total } = await models.shops.findAndCountAll({
        limit: pageSize,
        offset: (currentPage - 1) * pageSize
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
      description: '新增商家',
      notes: '新增商家',
      auth: false,
      validate: {
        payload: {
          name: Joi.string().required().description('商家名称'),
          type: Joi.number().integer().min(1).max(2).required().description('商家类型'),
          dishesCount: Joi.number().integer().min(0).default(0).description('菜品数量'),
          rate: Joi.number().min(0).max(5).default(0).description('分数')
        }
      },
      handler: async (req, h) => {
        const { name, type, dishesCount, rate } = req.payload
        await models.shops.create({
          name,
          type,
          dishes_count: dishesCount,
          rate
        })
        return {
          statusCode: 200,
          error: null,
          message: '操作成功!'
        }
      }
    }
  }
]
