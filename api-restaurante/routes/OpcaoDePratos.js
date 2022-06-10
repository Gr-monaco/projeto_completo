const express = require('express');
const router = express.Router();
const OpcaoDePrato = require('../models/OpcaoDePrato');

router.get("/pegaOpcaodePrato/:id", getOpcaoDePrato, (req,res)=> {
    console.log(`GET request from: ${req.baseUrl} UNIQUE`);
    res.json(res.opcao);
})

router.get('/', async (req, res) => {
    console.log(`GET request from: ${req.baseUrl}`);
    try {
        const opcoes = await OpcaoDePrato.find();
        res.json(opcoes)
    } catch(err){
        res.status(500).json({ message: err.message})
    }
})


router.patch('/:id', getOpcaoDePrato, async (req, res)=> {
    console.log("Body:",req.body);
    console.log("opcao", res.opcao);

    res.opcao.nome = req.body.nome;
    res.opcao.preco = req.body.preco;
    res.opcao.descricao = req.body.descricao;

    try {
        const opcaoAtualizada = await res.opcao.save();
        res.status(200).json({message:"Atualizado com sucesso", op:opcaoAtualizada})
        console.log(`New Entry in Database: ${opcaoAtualizada}`)
    }catch (err){
        res.status(400).json({message: err.message})
    }
    /* console.log(res.opcao.id);
    if(req.body.nome != null){
        console.log(req.body.nome);
        res.opcao.nome = req.body.nome;
    }
    if(req.body.preco != null){
        res.opcao.preco = req.body.preco;
    }
    try{
        const opAtualizada = await res.opcao.save();
        res.json(opAtualizada);
        console.log(`New Entry in Database: ${opAtualizada}`)

    } catch (err){
        res.status(400).json({message: err.message})
    } */
})

router.post('/', async (req, res) => {
    console.log(`POST request from: ${req.baseUrl} `);
    const opcao = new OpcaoDePrato({
        nome: req.body.nome,
        tipo: req.body.tipo,
        preco: req.body.preco,
        descricao: req.body.descricao
    });
    try {
        const novaOpcao = await opcao.save();
        res.status(201).json(novaOpcao);
        console.log(`New Entry in Database: ${novaOpcao}`)
    } catch (err) {
        res.status(400).json({ message: err.message })
      }
})

router.delete('/:id', getOpcaoDePrato, async (req, res) =>{
    try{
        await res.opcao.remove();
        res.json({message: 'Opção deletada'});
    } catch(err){
        res.status(500).json({message:err.message});
    }
})

router.get("/pegaCincoPratosSushi", async(req, res) => {
    let opcoes;
    try{
        opcoes = await OpcaoDePrato.find({tipo:"sushi"}).sort({ _id: 1 }).limit(5)
        console.log(opcoes)
        if (opcoes == null || opcoes.length < 5 ){
            return res.status(404).json({ message: `Erro ao dar fetch : Sem opções suficientes ou servidor saiu` })
        } 
        return res.status(200).json(opcoes);
    }catch(err){
        return res.status(500).json({ message: err.message })
    }
})

router.get("/pegaCincoPorcoes", async(req, res) => {
    let opcoes;
    try{
        opcoes = await OpcaoDePrato.find({tipo:"porcao"}).sort({ _id: 1 }).limit(5)
        console.log(opcoes)
        if (opcoes == null || opcoes.length < 5 ){
            return res.status(404).json({ message: `Erro ao dar fetch : Sem opções suficientes ou servidor saiu` })
        } 
        return res.status(200).json(opcoes);
    }catch(err){
        return res.status(500).json({ message: err.message })
    }
})

async function getOpcaoDePrato(req, res, next) {
    let opcao
    try {
      opcao = await OpcaoDePrato.findById(req.params.id)
      if (opcao == null) {
        return res.status(404).json({ message: `Cannot find entry of ${OpcaoDePrato.modelName}` })
      }
    } catch (err) {
      return res.status(500).json({ message: err.message })
    }
  
    res.opcao = opcao
    next()
  }

module.exports = router