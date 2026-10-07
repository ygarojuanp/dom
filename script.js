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

function salvarTarefas(){
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function renderizarTarefas(){
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
        if( tarefa.concluido) {
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
            function() {
                alterarStatus(tarefa.id);
            }
        );

        const botaoEditar = document.createElement("button");
        const botaoExcluir = document.createElement("button");

        colunaAcoes.appendChild(botaoConcluir);



        linha.appendChild(colunaNumero);
        linha.appendChild(colunaTexto);
        linha.appendChild(colunaStatus);
        linha.appendChild(colunaAcoes);

        lista.appendChild(linha);

    });
}

function alterarStatus(id){
    tarefas.forEach(function(tarefa){
        if (tarefa.id === id) {
            tarefa.concluido = !tarefa.concluido;
        }
    });
    salvarTarefas();
    renderizarTarefas();
}

renderizarTarefas();