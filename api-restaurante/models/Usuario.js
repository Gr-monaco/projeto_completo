const mongoose = require('mongoose')

const clienteSchema = new mongoose.Schema({

    username: {
        type:String,
        required:true
    },
    password: {
        type:String, //Sera que tem que mudar se encriptar?
        required:true
    },
    email:{
        type:String,
        required:true
    }

});

module.exports = mongoose.model('Usuario', clienteSchema);