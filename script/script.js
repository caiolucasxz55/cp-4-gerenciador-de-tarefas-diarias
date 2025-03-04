// 1- criando o Array vazio para a atualização de tarefas com 'id, titulo e concluida' e fazendo uso do Spread

let tarefas = []

const tarefa = {
    id: 1,
    titulo:"titulo",
    concluida:false
};

const adicionarTarefa = (titulo) => {
    // adiciona a tarefa ( fiz o uso do datenow acho q pra ficar mais legal com o id sendo o tempo atual que a tarefa foi adicionada) e usa o spread para juntar e gera o alerta, alem de chamar a função atualizarLista para inseri-la na lista

    const novaTarefa = {
       id: Date.now(),
       titulo,
       concluida: false
    };
    tarefas = [tarefas, novaTarefa];
    atualizarLista();
    alert("Tarefa adicionada com sucesso!");
};

const atualizarLista = () => {
    // atualiza e cria a lista pegando os elementos do html e criando a partir do javaScript sem necessidade de mexer no codigo html

    const lista = document.getElementById("lista-tarefas");
    lista.innerHTML = "";
    tarefas.forEach(tarefa => {
        const li = document.createElement("li");
        li.textContent = tarefa.titulo;
        lista.appendChild(li);
    });

};

document.getElementById("btnAdicionar").addEventListener("click", () => {
    // adiciona o evento de click no botao para adicionar a tarefa
    const input = document.getElementById("idTarefa");
    // o if serve para remover espaços extras e verifica se o usuario digitou algo ( é basicamente pra confirmar se ta tudo certo) e ao fim o campo é limpo para novas entradas
    if (input.value.trim()) {
        adicionarTarefa(input.value.trim());
        input.value = "";
    }

});
document.addEventListener("DOMContentLoaded", atualizarLista);


