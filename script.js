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

    inputTarefa.value = "";
    inputTarefa.focus();
    
}

function salvarTarefas(){
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}
