const express = require("express");
const app = express();
const connection = require("./database/database");
const Cliente = require("./database/Cliente");
const Usuario = require("./database/Usuario");

//database
connection
        .authenticate()
        .then(() => {
            console.log("Conexão com o banco de dados realizada com sucesso!")
        })
        .catch((msgErro) => {
            console.log(msgErro);
        });

//importação controllers
const clienteController = require("./controller/cliente/Cliente");
const usuarioController = require("./controller/usuario/Usuario");


//infoma que express ira usar ejs
app.set('view engine', 'ejs');

//informa que iremos usar arquivos estaticos
app.use(express.static('public'));



app.get("/", function(req, res){
    res.render('admin')

})



//usa o controller de cliente
app.use("/", clienteController);

//usa o controller de cliente
app.use("/", usuarioController);


app.listen(4000, function(erro){
    if(erro){
        console.log("Ocorreu um erro ao iniciar o servidor")
    }else{
        console.log("Servidor iniciado com sucesso!")
    }
})