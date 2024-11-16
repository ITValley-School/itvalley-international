// URL da API que retorna as tarefas
const apiURL = '/api/demandas/listdemandeDispos';




// Função para buscar e preencher as tarefas
async function fetchTasks() {
    try {
        const response = await fetch(apiURL);
        if (!response.ok) {
            throw new Error('Erro ao buscar dados da API');
        }

        const tasks = await response.json();
        console.log(tasks)

        // Localiza o elemento tbody
        const taskTableBody = document.getElementById('taskTableBody');
         // Acessa a propriedade `query` que contém o array de tarefas
         if (Array.isArray(tasks.query)) {
            const taskTableBody = document.getElementById('taskTableBody');
            taskTableBody.innerHTML = ''; // Limpa o conteúdo existente

            tasks.query.forEach((task, index) => {
                // Define as classes Bootstrap para o status
                let statusClass = '';
                switch (task.status) {
                    case 'A Fazer':
                        statusClass = 'badge bg-label-primary me-1';
                        break;
                    case 'Em Andamento':
                        statusClass = 'badge bg-label-warning me-1';
                        break;
                    case 'Feito':
                        statusClass = 'badge bg-label-success me-1';
                        break;
                    default:
                        statusClass = 'badge bg-label-secondary me-1';
                }

                // Cria uma nova linha de tabela com os dados da tarefa
                const row = `
                    <tr>
                        <th scope="row">${index + 1}</th>
                        <td>${task.nome}</td>
                        <td><button type="button" class="btn btn-primary" data-task-id="${task.id}" data-action="Details" data-bs-toggle="modal" data-bs-target="#modalDescriptionTask">
                            Detalhes da Tarefa
                        </button></td>
                        <td>${task.estimativa_horas} horas</td>
                        <td><span class="${statusClass}">${task.status}</span></td>
                        <td>${task.data_inicio || 'N/A'}</td>
                        <td>${task.data_termino_previsto || 'N/A'}</td>
                        <td><button type="button" class="btn btn-primary" data-task-id="${task.id}" data-action="getTask" data-bs-toggle="modal" data-bs-target="#modalGetTask">
                            Pegar Tarefa
                        </button></td>
                    </tr>
                `;
                taskTableBody.innerHTML += row;
            });
        } else {
            console.error('A propriedade `query` não é um array:', tasks.query);
        }
    } catch (error) {
        console.error('Erro ao preencher as tarefas:', error);
    }
}


// Configuração do event delegation para escutar cliques nos botões
document.getElementById('taskTableBody').addEventListener('click', function(event) {
    const target = event.target;
    if (target.tagName === 'BUTTON') {
        const taskId = target.getAttribute('data-task-id');
        const action = target.getAttribute('data-action');

        if (action === 'Details') {

            //Atribuindo o ID da task ao botao (confirmar) do modal
            buttonConfirme = document.getElementById("modaldescricaogettask")
            buttonConfirme.setAttribute("data-task-id", taskId)                
            TaskDetails(taskId);

        } else if (action === 'getTask') {
            
            //Atribuindo o ID da task ao botao (confirmar) do modal
            botaoModalConfime = document.getElementById("modalGetTaskConfirme")
            botaoModalConfime.setAttribute("data-task-id", taskId)
            
            //getTask(taskId);
        }
    }
});


//Botao de confirmaçao - descricao

document.getElementById('modaldescricaogettask').addEventListener('click', function(){
    botaoModalConfime = document.getElementById('modaldescricaogettask')
    taskId = buttonConfirme.getAttribute('data-task-id')
    getTask(taskId)
})


//Botao de confirmacao - pega demanda

document.getElementById('modalGetTaskConfirme').addEventListener('click', function(){
    buttonConfirme = document.getElementById('modalGetTaskConfirme')
    taskId = buttonConfirme.getAttribute('data-task-id')
    getTask(taskId)
})



// Função para abrir detalhes da tarefa
async function TaskDetails(taskId) {
    console.log("Abrindo detalhes da tarefa com ID:", taskId);

    try {
        const response = await fetch("/api/demandas/listdemandaById", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: taskId })
        });

        if (!response.ok) {
            throw new Error('Erro ao buscar a descrição da tarefa');
        }

        const result = await response.json();
        console.log(result)
        
        // Atualiza o conteúdo do parágrafo no modal com a descrição da tarefa
        const descriptionParagraph = document.getElementById('paragraph');
        descriptionParagraph.textContent = result.query.descricao || 'Descrição não disponível';
    } catch (error) {
        console.error('Erro ao buscar a descrição da tarefa:', error);
    }
}

// Função para pegar tarefa
async function getTask(taskId) {
    try {
        const response = await fetch("/api/demandas/getDemande", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ tarefa_id: taskId, status_aprovacao: 'pendente' })
        });

        if (!response.ok) {
            throw new Error('Erro ao buscar a descrição da tarefa');
        }

        const result = await response.json();
        console.log(result)

        return console.log("Tarefa demandada com sucesso!")

    } catch (error) {
        console.error('Erro ao buscar a descrição da tarefa:', error);
    }
}



// Chama a função ao carregar a página
document.addEventListener('DOMContentLoaded', fetchTasks);
