const {sequelize} = require('../../../database/models/index.js')
const fs = require("fs")


module.exports = {
    createProduct: createProduct,
    upProduct: upProduct,
    getProducts: getProducts,
    deleteProducts: deleteProducts
};


/* Function is use to Register new product
 * @return json
 */
async function  createProduct(req, res) {
        if (Object.keys(req.body).length == 0) {
          return  res.status(500).send({message: 'empty data'})
        }
        const name = req.body.name ? req.body.name : null;
        const price = req.body.price ? req.body.price : null;
        const description = req.body.description ? req.body.description : null;
        if (!name || !price || !description || !req.body.file) {
          return  res.status(500).send({message: 'incorrect data'})
        }
        let newProduct = {
            name: name,
            price: price,
            description: description
        }
        try {

            let product = await sequelize.models.Products.create(newProduct);
            let base64Data = req.body.file.replace(/.*base64,/, "");
            fs.writeFile('./uploads/' + product.id + '.jpg', base64Data, 'base64', function (err) {
            },);
          return  res.status(200).send({message: 'Ok'})
        } catch (error) {
           return res.status(500).send({message: 'something is wrong, please try again', error: error})
        }

}


/* Function is use to update product
 * @return json
 */
async function upProduct(req, res) {
        if (Object.keys(req.body).length < 2) {
           return res.status(500).send({message: 'empty data'});

        }
        const id = req.body.id ? req.body.id : null;
        const name = req.body.name ? req.body.name : null;
        const price = req.body.price ? req.body.price : null;
        const description = req.body.description ? req.body.description : null;

        if (!name && !price && !description && !req.body.file) {
           return res.status(500).json({message: 'incorrect data'});
        }
        let newProduct = {};
        if (name&&name.length) {
            newProduct.name = name;
        }
        if (price) {
            newProduct.price = price;
        }
        if (description&&description.length) {
            newProduct.description = description;
        }

        try {
            let product = await sequelize.models.Products.update(newProduct,{where:{id:id}});
            if(req.body.file&&req.body.file.length) {
                let base64Data = req.body.file.replace(/.*base64,/, "");
                await fs.writeFile('./uploads/' + id + '.jpg', base64Data, 'base64', function (err) {
                },);
            }
            return res.status(200).send({message: 'Ok'});
        } catch (error) {
            console.log('this',error)
            return res.status(500).send({message: 'something is wrong, please try again', error: error});
        }



}


/* Function is use to get list products
 * @return json
 */
async function getProducts(req, res) {
        try {
            let products = await sequelize.models.Products.findAll({attributes: ['id', 'name', 'price', 'description']});
           return res.status(200).send({message: 'ok', products: products})
        } catch (error) {
           return res.status(500).send({message: 'something is wrong, please try again', error: error})

        }

}


/* Function is use to delete product
 * @return json
 */
async function deleteProducts(req, res) {
        try {
            let product = await sequelize.models.Products.destroy({where: {id: req.body.id}});
            res.status(200).send({message: 'ok'})
        } catch (error) {
            res.status(500).send({message: 'something is wrong, please try again',error:error})

        }



}