const db = require("../sequelize");//connfigurações
const sequelize = require("sequelize");//framework
const Carro = require('./Carro');

const Inventario = db.define("Inventario", {
  id: {
    type: sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  carroId: sequelize.INTEGER,
  quantidade: sequelize.INTEGER
}, {});

Inventario.belongsTo(Carro, { foreignKey: 'carroId' });
Inventario.sync();
module.exports = Inventario;
