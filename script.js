//=============
//Elementos Dom
//=============

const form = document.querySelector("#form-tarefa");
const inputTarefa = document.querySelector("#tarefa");
const contador = document.querySelector("#contador");
const lista = document.querySelector("#lista-tarefas");

// resgatar tarefas do localStorage
let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

// ouvir o evento clique
form.addEventListener("submit", adicionarTarefa);

// funçoes
function adicionarTarefa(e) {
    e.preventDefault();

    let texto = inputTarefa.value.trim();
    if (texto === "") {
        alert("Digite uma tarefa!");
        return;
    }

    const novaTarefa = {
        id: Date.now(),
        texto: texto,
        concluido: false
    };
    console.log(novaTarefa);

    tarefas.push(novaTarefa);
    salvarTarefas();
    renderizarTarefas();

    inputTarefa.value = "";
    inputTarefa.focus();

}

function salvarTarefas() {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function renderizarTarefas() {
    lista.innerHTML = "";

    tarefas.forEach(function (tarefa, indice) {
        const linha = document.createElement("tr");

        const colunaNumero = document.createElement("td");
        colunaNumero.textContent = indice + 1;

        const colunaTexto = document.createElement("td");
        colunaTexto.textContent = tarefa.texto;

        if (tarefa.concluido) {
            colunaTexto.classList.add(
                "text-decoration-line-through",
                "text-muted"
            )
        }

        const colunaStatus = document.createElement("td");
        if (tarefa.concluido) {
            colunaStatus.innerHTML = '<span class="badge text-bg-success">Concluida</spam>';
        } else {
            colunaStatus.innerHTML = '<span class="badge text-bg-warning">Pendente</spam>';
        }

        const colunaAcoes = document.createElement("td");
        colunaAcoes.classList.add(
            "text-center"
        );
        const botaoConcluir = document.createElement("button");
        botaoConcluir.textContent = tarefa.concluido ? "reabrir" : "Concluir";
        botaoConcluir.classList.add(
            "btn",
            tarefa.concluido ? "btn-warning" : "btn-success",
            "btn-sm",
            "me-2"
        );
        botaoConcluir.addEventListener(
            "click",
            function () {
                alterarStatus(tarefa.id);
            }
        );

        const botaoEditar = document.createElement("button");
        botaoEditar.textContent = "Editar";
        botaoEditar.classList.add(
            "btn",
            "btn-primary",
            "btn-sm",
            "me-2"
        );
        botaoEditar.addEventListener(
            "click",
            function () {
                editarTarefa(tarefa.id);
            }
        );

        const botaoExcluir = document.createElement("button");
        botaoExcluir.textContent = "Excluir";
        botaoExcluir.classList.add("btn", "btn-danger", "btn-sm");
        botaoExcluir.addEventListener("click", function () {
            excluirTarefa(tarefa.id);
        });

        colunaAcoes.appendChild(botaoConcluir);
        colunaAcoes.appendChild(botaoEditar);
        colunaAcoes.appendChild(botaoExcluir);




        linha.appendChild(colunaNumero);
        linha.appendChild(colunaTexto);
        linha.appendChild(colunaStatus);
        linha.appendChild(colunaAcoes);

        lista.appendChild(linha);

    });
    atualizarContador();
}

function alterarStatus(id) {
    tarefas.forEach(function (tarefa) {
        if (tarefa.id === id) {
            tarefa.concluido = !tarefa.concluido;
        }
    });
    salvarTarefas();
    renderizarTarefas();
}

function editarTarefa(id) {
    const tarefa = tarefas.find(function (tarefa) {
        return tarefa.id === id;
    });
    if (!tarefa) {
        return;
    }
    do {
        const novoTexto = prompt("Digite um novo texto:", tarefa.texto);
        if (novoTexto === null) {
            return;
        };

        texto = novoTexto.trim();
        if (texto === "") {
            alert("A tarefa não pode ficar vazia.");
        }
    } while (texto === "");

    tarefa.texto = texto;
    salvarTarefas();
    renderizarTarefas();

}
function excluirTarefa(id) {
    const confirmar = confirm("Deseja realmente excluir essa tarefa?");
    if (!confirmar) {
        return;
    }
    tarefas = tarefas.filter(function (tarefa) {
        return tarefa.id !== id;
    });

    salvarTarefas();
    renderizarTarefas();
}

function atualizarContador() {
    const quantidade = tarefas.length;
    if (quantidade === 0) {
        contador.textContent = "Não há tarefa";
    } else {
        contador.textContent = quantidade + "tarefa"
    }
}

renderizarTarefas();