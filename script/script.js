// 1- criando o Array vazio para a atualização de tarefas com 'id, titulo e concluida' e fazendo uso do Spread

let tarefas = []

const tarefa = {
    id: 1,
    titulo:"titulo",
    concluida:false
};

const adicionarTarefa = (titulo) => {
    // adiciona a tarefa aumentando o id gradativamente com base nas tarefas adicionadas e usa o spread para juntar e gera o alerta, alem de chamar a função atualizarLista para inseri-la na lista

    const novaTarefa = {
       id: tarefas.length + 1,
       titulo,
       concluida: false
    };
    tarefas = [...tarefas, novaTarefa];
    atualizarLista(tarefas);
    // reduce adicionado para o calculo de tarefas concluidas que serao exibidas no alert
    const totalConcluidas = tarefas.reduce((total, tarefa) => {
        return tarefa.concluida ? total + 1 : total;
    }, 0);
    
    alert(`Tarefa adicionada com sucesso! Total de tarefas concluídas: ${totalConcluidas}`);
};

const concluirTarefa = (id) =>{
    // localiza a tarefa e altera o False predefinido para todas as tarefas para True
    tarefas = tarefas.map(tarefa => 
        tarefa.id === id ? { ...tarefa, concluida: true } : tarefa
    );

    //uso do find para pegar titulo e id da tarefa e analisa-la e passar para True
    const tarefaConcluida = tarefas.find(tarefa => tarefa.id === id);
    
    if (tarefaConcluida) {
        const { titulo, concluida } = tarefaConcluida;
        alert(`Tarefa concluída - Título: ${titulo}, Status: ${concluida}`);
    }
atualizarLista(tarefas);
};

const filtrarPendentes = () => {
    //filtra as tarefas que nao foram alteradas para True ou seja tarefas que ainda nao foram concluidas
    const tarefasPendentes = tarefas.filter(tarefa => !tarefa.concluida);
    atualizarLista(tarefasPendentes);
}

const filtrarConcluidas = () => {
    //filtra as tarefas concluidas para modifica-las na lista e ficar com mais facil vizualização
    const tarefasConcluidas = tarefas.filter(tarefa => tarefa.concluida);
    atualizarLista(tarefasConcluidas);
};



const atualizarLista = (listaTarefas = tarefas) => {
    // atualiza a lista e alterando remotamente o HTML para criar os itens da lista
    const lista = document.getElementById("lista-tarefas");
    lista.innerHTML = "";
    
    listaTarefas.forEach(tarefa => {
        const li = document.createElement("li");
        li.textContent = tarefa.titulo;

    //aqui adiciona o botao de concluir ao lado de cada tarefa adicionada, assim o usuario pode clicar em concluir assim uma linha vai passar pela tarefa concluida assim melhorando a vizualização das tarefas ainda pendentes

        if (!tarefa.concluida) {
            const botaoConcluir = document.createElement("button");
            botaoConcluir.textContent = "Concluir";
            botaoConcluir.addEventListener("click", () => concluirTarefa(tarefa.id));
            li.appendChild(botaoConcluir);
        } else {
            li.style.textDecoration = "line-through";
        }
        
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

document.getElementById("filtrar-pendentes").addEventListener("click", filtrarPendentes);
document.getElementById("mostrar-todas").addEventListener("click", () => atualizarLista());
document.getElementById("filtrar-concluidas").addEventListener("click", filtrarConcluidas);


document.addEventListener("DOMContentLoaded", () => atualizarLista(tarefas));


