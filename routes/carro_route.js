const express = require('express');
const router = express.Router();
const sequelize = require('../sequelize');
const Carro = require('../model/Carro');
const Cliente = require('../model/Cliente');
const Inventario = require('../model/Inventario');
const Pedido = require('../model/Pedido');
sequelize.sync();  
//GET Retorna tarefas com paginação e ordenação
router.get('/', async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    sequelize.query(`SELECT * FROM carros ORDER BY updatedAt DESC LIMIT ? OFFSET ?`,
        { replacements: [parseInt(limit), (page - 1) * parseInt(limit)] }
    )
    .then(([results, metadata]) => {
        res.json(results);
    }).catch((error) => {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    });
});

//GET Consulta uma tarefa pelo ID
router.get('/:id', async (req, res) => {
    sequelize.query(`SELECT * FROM Carros WHERE id = ?`, { replacements: [req.params.id] })
    .then(([results, metadata]) => {
        if (results.length === 0) {
            res.status(404).json({
                success: false,
                message: "carro não encontrada",
            });
        } else {
            res.json({
                success: true,
                task: results[0],
            });
        }
    }).catch((error) => {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    });
});

//POST Cria uma tarefa
router.post('/', async (req, res) => {
    sequelize.query(`INSERT INTO carros (modelo, preco, caracteristicas, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?)`,
        { replacements: [req.body.modelo, req.body.preco, req.body.caracteristicas, new Date(), new Date()] }
    )
    .then(([results, metadata]) => {
        res.status(201).json({
            success: true,
            message: "Carro criado com sucesso",
        });
    }).catch((error) => {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    });
});

//PUT Atualiza uma tarefa pelo ID
router.put('/:id', async (req, res) => {
    sequelize.query(`UPDATE carros SET caracteristicas = ? WHERE id = ?`,
        { replacements: [req.body.caracteristicas, req.params.id] }
    )
    .then(([results, metadata]) => {
        if (metadata.affectedRows === 0) {
            res.status(404).json({
                success: false,
                message: "Carro não encontrado",
            });
        } else {
            res.json({
                success: true,
                message: "Carro atualizado com sucesso",
            });
        }
    }).catch((error) => {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    });
});

//DELETE Deleta uma tarefa pelo ID
router.delete('/:id', async (req, res) => {
    sequelize.query(`DELETE FROM Carros WHERE id = ?`, { replacements: [req.params.id] })
    .then(([results, metadata]) => {
        if (metadata.affectedRows === 0) {
            res.status(404).json({
                success: false,
                message: "Carro não encontrado",
            });
        } else {
            res.json({
                success: true,
                message: "Carro deletado com sucesso",
            });
        }
    }).catch((error) => {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    });
});

module.exports = router;
