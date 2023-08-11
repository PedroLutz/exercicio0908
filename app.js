const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const carros = require("./routes/carro_route");
const tasks = require("./routes/task_route");
const pedidos = require("./routes/pedido_route");
const inventarios = require("./routes/inventario_route");
const clientes = require("./routes/cliente_route");
const PORT =  8081;

app.use(cors());
app.use(bodyParser.json());
app.use("/carros",carros);
app.use("/tasks",tasks);
app.use("/pedidos",pedidos);
app.use("/inventarios",inventarios);
app.use("/clientes",clientes);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});


