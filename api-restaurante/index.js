const db = require('./database');
const express = require('express');



const app = express();

const cors = require("cors");
app.use(cors());

app.use (express.json());

const opcaoDePratosRouter = require('./routes/OpcaoDePratos');
const usuarioRouter = require('./routes/Usuario');
const pedidoRouter = require('./routes/Pedido');
const adminRouter = require('./routes/Admin');
app.use('/opcaoDePrato', opcaoDePratosRouter);
app.use('/usuario', usuarioRouter);
app.use('/pedido', pedidoRouter);
app.use('/admin', adminRouter);
app.listen(5000);