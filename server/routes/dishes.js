const Joi = require('joi')
const Boom = require('boom')
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
        },
        order: [
          ['rate', 'DESC']
        ]
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
      description: '新增菜品',
      notes: '新增菜品',
      auth: false,
      validate: {
        payload: {
          name: Joi.string().required().description('商家名称'),
          shopId: Joi.number().integer().min(1).required().description('商家类型'),
          rate: Joi.number().min(0).max(5).default(0).description('分数')
        }
      },
      handler: async (req, h) => {
        const { name, shopId, rate } = req.payload
        const shop = await models.shops.findOne({
          where: {
            id: shopId
          }
        })
        if (!shop) {
          throw Boom.badRequest('商家不存在')
        }
        await models.dishes.create({
          name,
          shop_id: shopId,
          shop_name: shop.name,
          rate
        })
        await shop.update({
          dishes_count: shop.dishes_count + 1
        })
        return {
          statusCode: 200,
          error: null,
          message: '操作成功!'
        }
      }
    }
  },
  {
    method: 'GET',
    path: `/${GROUP_NAME}/rank`,
    config: {
      tags: ['api', GROUP_NAME],
      description: '获取菜品排行榜',
      notes: '获取菜品排行榜',
      auth: false
    },
    handler: async (req, h) => {
      const results = await models.dishes.findAll({
        order: [
          ['rate', 'DESC']
        ],
        limit: 10
      })
      return results
    }
  }
]
