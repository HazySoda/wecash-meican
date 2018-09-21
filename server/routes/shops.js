const { paginationDefine } = require('../utils/router-helper')
const models = require('../models')

const GROUP_NAME = 'shops'

module.exports = [
  {
    method: 'GET',
    path: `/${GROUP_NAME}`,
    config: {
      tags: ['api', GROUP_NAME],
      description: '获取商品列表',
      notes: '获取商品列表',
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
  }
]
