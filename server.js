const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.send("RAIZ FUNCIONANDO");
});




//  Conexão com MySQL — XAMPP usa porta 3307
const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",   // troque aqui se tiver senha
    database: "minicrud",
    port: 3306
});

//  Teste de conexão com log detalhado
db.getConnection((err, connection) => {
    if (err) {
        console.error(" ERRO AO CONECTAR NO MYSQL:");
        console.error(err);
        return;
    }
    console.log(" MySQL conectado com sucesso!");
    connection.release();
});

//  LISTAR itens
app.get("/itens", (req, res) => {
    db.query("SELECT * FROM itens", (err, result) => {
        if (err) {
            console.error("Erro ao listar itens:", err);
            return res.status(500).json({ erro: "Erro ao listar itens" });
        }
        res.json(result);
    });
});

//  ADICIONAR item
app.post("/itens", (req, res) => {
    const { nome } = req.body;

    db.query("INSERT INTO itens (nome) VALUES (?)", [nome], (err, result) => {
        if (err) {
            console.error("Erro ao inserir item:", err);
            return res.status(500).json({ erro: "Erro ao inserir item" });
        }

        res.json({ id: result.insertId, nome });
    });
});

//  DELETAR item
app.delete("/itens/:id", (req, res) => {
    const id = req.params.id;

    db.query("DELETE FROM itens WHERE id = ?", [id], (err) => {
        if (err) {
            console.error("Erro ao deletar item:", err);
            return res.status(500).json({ erro: "Erro ao deletar item" });
        }

        res.json({ msg: "Item removido com sucesso!" });
    });
});

//  Servidor
app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});
