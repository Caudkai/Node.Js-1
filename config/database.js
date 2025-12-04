const Sequelize = require("sequelize");

const connection = new Sequelize("escola", "root", "", {
  host: "localhost",
  dialect: "mysql",
  logging: console.log, // ativa logs no console
});

module.exports = connection;