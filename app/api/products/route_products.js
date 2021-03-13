module.exports = function(router) {

    const user = require('./controllers/product_ctrl');

    router.post('/createProduct',[], user.createProduct);
    router.put('/upProduct',[], user.upProduct);
    router.get('/getProducts',[], user.getProducts);
    router.delete('/deleteProducts',[], user.deleteProducts);







    return router;
}