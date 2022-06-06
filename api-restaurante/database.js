const mongoose = require('mongoose');


mongoose.Promise = global.Promise;

//Sushi é o nome do banco de dados que vai ser criado
mongoose.connect("mongodb://localhost:27017/sushi",{ useNewUrlParser: true })
const db = mongoose.connection

db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

module.exports = db;