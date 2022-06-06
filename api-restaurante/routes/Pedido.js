const express = require('express');
const router = express.Router();

const Pedido = require('../models/Pedido');
const OpcaoDePrato = require('../models/OpcaoDePrato')


router.post('/', async (req,res)=> {
    console.log(`GET REQUEST`);
    try{
        //Transforma o objeto de recebimento em dois arrays
        const pratos = Object.keys(req.body);
        const qnt = Object.values(req.body);
        //Tira o email dos arrays
        pratos.pop()
        qnt.pop()

        const opcoesArray = [];
        let prato;
        let precoTotalDoPrato;
        for (let index = 0; index < pratos.length; index++) {
            prato = await OpcaoDePrato.findById(pratos[index]);
            precoTotalDoPrato = prato.preco * qnt[index];
            opcoesArray.push({nomePrato: prato.nome, quantidade: qnt[index], valor_unitario:prato.preco, valor_total_do_prato: precoTotalDoPrato})            
        }

        let valorTotalPedido = opcoesArray.reduce((accumulador, elementoAtual) => {return accumulador + elementoAtual.valor_total_do_prato}, 0);
        const pedido = new Pedido({
            opcoes: opcoesArray,
            cliente: req.body.email,
            valorTotal: valorTotalPedido
        });
        const novoPedido = await pedido.save();
    } catch(err){
        res.status(400).json({message: err.message});
    }
})

module.exports = router