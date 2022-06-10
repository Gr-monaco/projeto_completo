const mongoose = require('mongoose');

const subop = new mongoose.Schema({
    _id:false,
    nomePrato: {
        type: String,
        required:true
    },
    quantidade : {
        type: Number,
        required: true
    },
    valor_unitario : {
        type: Number,
        required: true
    },
    valor_total_do_prato : {
        type: Number,
        required: true
    }
});

const pedidoSchema = new mongoose.Schema({
    opcoes: [subop],
    cliente: {
        type:String,
        required:true
    },
    endereco: {
        type:String,
        required:true
    },
    formaPagamento: {
        type:String,
        required:true
    },
    valorTotal: {
        type: Number,
        required:true
    }
})

module.exports = mongoose.model('Pedido', pedidoSchema);
