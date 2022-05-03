const conn = require('../db/conn')

const { ObjectId } = require('mongodb') //Extrair esse módulo do mongo para poder pegar o id do banco

class Product {
//Serve para criar um objeto com as propriedades do model
    constructor(name, image, price,description){

        this.name = name
        this.image = image
        this.price = price
        this.description = description
}

save(){//Função para inserir os products e criar a collection no banco
    const product = conn.db().collection('products').insertOne({
        name:this.name,
        image:this.image,
        price:this.price,
        description:this.description
    })
    return product
}

static getProducts(){//Função para retornar dados do banco, semelhante ao select
    
    const products = conn.db().collection('products').find().toArray()
    return products
}

static async getProductById(id){//Pegar dado individual

    const product = await conn.db().collection('products').findOne({_id:ObjectId(id)})

    return product
}

static async removeProductById(id){
    await conn.db().collection('products').deleteOne({_id:ObjectId(id)})

    return
}

updateProduct(_id){

 conn.db().collection('products').updateOne({ _id: ObjectId(_id) }, { $set: this })

 return
}




}
module.exports = Product