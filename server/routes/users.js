const Joi = require('joi')
const Boom = require('boom')
const JWT = require('jsonwebtoken')
const axios = require('axios')
const WXBizDataCrypt = require('../utils/decrypt-data')
const config = require('../config')
const models = require('../models')

const GROUP_NAME = 'users'

module.exports = [
  {
    method: 'POST',
    path: `/${GROUP_NAME}/createJWT`,
    handler: async (request, h) => {
      const generateJWT = jwtInfo => {
        const payload = {
          userId: jwtInfo.userId,
          exp: +new Date() + (2 * 60 * 60 * 1000)
        }
        return JWT.sign(payload, config.secrty.JWT)
      }
      return generateJWT(request.payload)
    },
    config: {
      tags: ['api', GROUP_NAME],
      description: '测试 JWT 签发',
      notes: '测试 JWT 签发',
      auth: false, // 约定此接口不参与 JWT 的用户验证，会结合 hapi-auth-jwt2 来使用
      validate: {
        payload: Joi.object().keys({
          userId: Joi.number().integer().min(1).required().description('用户ID')
        })
      }
    }
  },
  {
    method: 'POST',
    path: `/${GROUP_NAME}/wxLogin`,
    handler: async (request, h) => {
      try {
        const appid = config.secret.appId // 你的小程序 appid
        const secret = config.secret.appSecret // 你的小程序 appsecret
        const { code, encryptedData, iv } = request.payload
        const res = await axios({
          url: 'https://api.weixin.qq.com/sns/jscode2session',
          method: 'GET',
          params: {
            appid,
            secret,
            js_code: code,
            grant_type: 'authorization_code'
          }
        })
        // res 中返回 openid 与 session_key
        const { openid, session_key: sessionKey } = res.data
        // 基于 openid 查找或创建一个用户
        const user = await models.users.findOrCreate({
          where: {
            open_id: openid
          }
        })
        const encrypted = new WXBizDataCrypt(appid, sessionKey)
        const userInfo = encrypted.decryptData(encryptedData, iv)
        // 更新user表中的用户的资料信息
        await models.users.update({
          nick_name: userInfo.nickName,
          gender: userInfo.gender,
          avatar_url: userInfo.avatarUrl,
          open_id: openid,
          session_key: sessionKey
        }, {
          where: { open_id: openid }
        })
        // 签发 jwt
        const generateJWT = jwtInfo => {
          const payload = {
            userId: jwtInfo.userId,
            exp: Math.floor(new Date().getTime() / 1000) + 7 * 24 * 60 * 60
          }
          return JWT.sign(payload, config.secret.JWT)
        }
        const token = generateJWT({
          userId: user[0].id
        })
        return {
          userId: user[0].id,
          token
        }
      } catch (e) {
        console.log(e)
        throw Boom.badImplementation('签发Token失败')
      }
    },
    config: {
      auth: false, // 不需要用户验证
      tags: ['api', GROUP_NAME], // 注册 swagger 文档,
      description: '用于小程序 JWT 签发',
      validate: {
        payload: {
          code: Joi.string().required().description('微信用户登录的临时code'),
          encryptedData: Joi.string().required().description('微信用户信息encryptedData'),
          iv: Joi.string().required().description('微信用户信息iv')
        }
      }
    }
  }
]
