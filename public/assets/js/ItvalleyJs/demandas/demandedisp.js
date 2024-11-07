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
                        <td><button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalScrollable">
                            Detalhes da Tarefa
                        </button></td>
                        <td>${task.estimativa_horas} horas</td>
                        <td><span class="${statusClass}">${task.status}</span></td>
                        <td>${task.data_inicio || 'N/A'}</td>
                        <td>${task.data_termino_previsto || 'N/A'}</td>
                        <td><button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalScrollable">
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

// Chama a função ao carregar a página
document.addEventListener('DOMContentLoaded', fetchTasks);
