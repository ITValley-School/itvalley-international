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
                        <td><button type="button" class="btn btn-primary" data-action="getTask" data-bs-toggle="modal" data-bs-target="#modalDescriptionTask">
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
            TaskDetails(taskId);
        } else if (action === 'pegar') {
            pegarTarefa(taskId);
        }
    }
});


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
function getTask(taskId) {
    console.log("Pegando a tarefa com ID:", taskId);
    // Aqui você pode adicionar a lógica para pegar a tarefa (atualizar o status, etc.)
}



// Chama a função ao carregar a página
document.addEventListener('DOMContentLoaded', fetchTasks);
