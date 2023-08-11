const db = require("../sequelize");
const sequelize = require("sequelize");

const Task = db.define("task", {
    id: {
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    description: {
        type: sequelize.STRING,
        allowNull: false,
    },
});

Task.sync();

module.exports = Task;