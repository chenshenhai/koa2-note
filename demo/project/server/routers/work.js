/**
 * 工作台子路由
 */

const router = require('koa-router')()
const controller = require('./../controllers/work')

const routers = router
  .get('/', controller.indexPage)


module.exports = routers