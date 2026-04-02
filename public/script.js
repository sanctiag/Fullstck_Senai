const API = "http://localhost:3000";

// Carregar itens ao abrir a página
window.onload = carregar;

function carregar() {
    fetch(API + "/itens")
        .then(r => r.json())
        .then(dados => {
            const lista = document.getElementById("lista");
            lista.innerHTML = "";

            dados.forEach(item => {
                lista.innerHTML += `
                    <tr>
                        <td>${item.id}</td>
                        <td>${item.nome}</td>
                        <td>
                            <button onclick="remover(${item.id})">Excluir</button>
                        </td>
                    </tr>
                `;
            });
        });
}

function salvar() {
    const nome = document.getElementById("nome").value.trim();

    if (!nome) {
        return alert("Digite um nome!");
    }

    fetch(API + "/itens", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome })
    })
    .then(() => {
        document.getElementById("nome").value = "";
        carregar();
    });
}

function remover(id) {
    fetch(API + "/itens/" + id, {
        method: "DELETE"
    })
    .then(() => carregar());
}
