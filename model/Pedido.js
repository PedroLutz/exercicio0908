const db = require("../sequelize");//connfigurações
const sequelize = require("sequelize");//framework
const Cliente = require('./Cliente');
const Carro = require('./Carro');

const Pedido = db.define("Pedido", {
  id: {
    type: sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  clienteId: sequelize.INTEGER,
  carroId: sequelize.INTEGER,
  dataPedido: sequelize.DATE,
  statusPedido: sequelize.STRING
}, {});

Pedido.belongsTo(Cliente, { foreignKey: 'clienteId' });
Pedido.belongsTo(Carro, { foreignKey: 'carroId' });
Pedido.sync();
module.exports = Pedido;
