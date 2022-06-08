const express = require('express');
const router = express.Router();

const Usuario = require('../models/Usuario');

router.post('/', async(req, res)=> {
    const usuario = new Usuario({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
    });
    try{
        const novoUsuario = await usuario.save();
        res.status(201).json(novoUsuario);
    } catch (err){
        res.status(400).json({message: err.message});
    }
})

router.post("/login", getUsuarioByEmail, (req, res)=>{

    if(res.usuario[0].password!= req.body.password){
        res.status(401).json({message:`Wrong password`});
        return;
    }
    res.status(200).json({username: res.usuario[0].username, email: res.usuario[0].email});
})

async function getUsuarioByEmail(req, res, next){
    let usuario;
    try {
        usuario = await Usuario.find({email:req.body.email});
        if (usuario.length == 0){
            return res.status(404).json({message: `Cannot find entry of ${Usuario.modelName}`})
        }
    } catch (err){
        return res.status(500).json({message: err.message});
    }

    res.usuario = usuario;
    next();
}

module.exports = router