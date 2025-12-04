const express = require("express");

const session = require("express-session"); //sesssion de login

const authMiddleware = require("./middlewares/authMiddleware");

const app     = express();

const clienteRoutes = require("./routes/clienteRoutes");
const usuarioRoutes = require("./routes/usuarioRoutes");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.use(session({
  secret: "segredo_secreto",
  resave: false,
  saveUninitialized: false
}));

app.get("/", authMiddleware, (req, res) => {
  res.render("index"); // Renderiza views/index.ejs
});

// Rotas
app.use("/", clienteRoutes);
app.use("/", usuarioRoutes);

//passar user logado para as views
app.use((req, res, next) => {
  res.locals.usuarioLogado = req.session.usuario;
  next();
});

app.listen(4000, () => console.log("Servidor rodando na porta 4000"));