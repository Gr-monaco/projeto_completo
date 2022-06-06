const mongoose = require('mongoose');

//Model é importante porque define a collection na qual o dado vai ser inserido
const opcaoDePratoSchema = new mongoose.Schema({
    nome: {
        type: String,
        required:true
    },
    preco:{
        type:Number,
        required:true
    },
    descricao:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('OpcaoDePrato', opcaoDePratoSchema);