const Product = require('../models/Product')

module.exports = class ProductControllers{

    static async showProducts(req,res){
        const products = await Product.getProducts()//chama função para pegar dados do banco
        res.render('products/all', { products} ) //Envia os dados para a view exibir
    }

    static createProduct(req,res){
        res.render('products/create')
    }

    
    static createProductPost(req,res){//controller para cadastrar dado no banco

        const name = req.body.name
        const image = req.body.image 
        const price = req.body.price
        const description = req.body.description

        const product = new Product(name, image, price, description)//

        product.save()//passa esses dados para a função que salva no banco

        res.redirect('/products')
    }

    static async getProduct(req,res){//pegar dado individual

        const id = req.params.id

        const product = await Product.getProductById(id)

        res.render('products/product', { product })
    }

    static async removeProduct(req,res){

        const id = req.params.id

        await Product.removeProductById(id)

        res.redirect('/products')

    }

    static async editProduct(req,res){

        const id = req.params.id
        const product = await Product.getProductById(id)

        res.render('products/edit', { product })

    }

    static async updateProduct(req,res){

        const _id = req.body.id
        const name = req.body.name
        const image = req.body.image
        const price = req.body.price
        const description = req.body.description

        const product = new Product(name, image, price, description)

        await product.updateProduct(_id)


        res.redirect(`/products`)

        

    }




}