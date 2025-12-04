const { where } = require("sequelize");
const Usuario = require("../models/Usuario");


//listar todos
exports.index = async (req, res) => {

  const usuarios = await Usuario.findAll()
  res.render("usuario/index", { usuarios });
};


// Salvar novos

exports.save = async (req, res) => {
  
  const { nome, nome_user, senha, cpf, email } = req.body;  //pegar dados

  await Usuario.create({ nome, nome_user, senha, cpf, email}); //salvar

  res.redirect("/usuarios");  //redirecionar dados
};


// formulario novo cliente  

exports.new = async (req, res) => {
  
  res.render("usuario/new");
};


//formulario edição - edit
exports.edit = async (req, res) => {
  
  const usuario = await Usuario.findByPk(req.params.id);  //pegar dados

  res.render("usuario/edit", { usuario });
};


//Atualizar usuario 
exports.update = async (req, res) => {
  
  const { nome, nome_user, senha, cpf, email } = req.body;  //pegar dados

  await Usuario.update({ nome, nome_user, senha, cpf, email}, {

    where: { id: req.params.id}
  }); //salvar

  res.redirect("/usuarios");  //redirecionar dados
};


//Deletar
exports.delete = async (req, res) => {
  
  await Usuario.destroy({where: { id: req.params.id } });  //pegar dados

  res.redirect("/usuarios");  //redirecionar dados
};

//tela de login
exports.loginForm = (req, res) => {

  res.render("usuarios/login");
};


//tela de login
exports.login =  async (req, res) => {

  const { email, senha } = req.body;  //pegar dados};
  const usuario = await Usuario.findOne({ where: { email } });  //pegar dados

  if(!usuario){
    return res.send("Usuario não encontrado!");
  }

  //compara senha em texto puro
  if (usuario.senha !== senha){
    return res.send("Senha incorreta!");
  }

  //salva user na sessão
  req.session.usuario = {
    id: usuario.id,
    nome: usuario.nome,
    email: usuario.email
  };

  res.redirect("/");
};


//logout
exports.logout = (req, res) => {

  res.session.destroy(() => {
    res.redirect("/login");
  
  });
};
