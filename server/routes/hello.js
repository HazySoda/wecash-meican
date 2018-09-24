module.exports = [
  {
    method: 'GET',
    path: '/',
    config: {
      tags: ['api', 'test'],
      description: '测试连接',
      notes: '测试连接',
      auth: false
    },
    handler: async (req, h) => {
      return 'Hello Hapi!'
    }
  }
]
