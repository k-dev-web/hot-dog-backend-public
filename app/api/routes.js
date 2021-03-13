module.exports = function (express) {
  
    let router = express.Router()
    require('./products/route_products')(router)
    return router;
}