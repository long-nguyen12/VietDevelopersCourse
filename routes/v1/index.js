const Router = require('koa-router')
const router = new Router()
const feeds = require('./feeds')

router.use('/feeds', feeds)

module.exports = router.routes()