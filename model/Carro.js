const db = require("../sequelize");//connfigurações
const Sequelize = require("sequelize");//framework

const Carro = db.define("Carro", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  modelo: Sequelize.STRING,
  preco: Sequelize.FLOAT,
  caracteristicas: Sequelize.TEXT
});

Carro.sync();

module.exports = Carro;
