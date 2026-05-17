/*

 Projeto PI Senac 2026 - v1 "Front-end"
 Descrição: Lista de agendamentos

*/


// =========================================
// TOKEN
// =========================================
const API_URL =
    'https://sistema-agendamento-mvp.onrender.com';

const token =
    localStorage.getItem(
        'tokenUsuario'
    );


// =========================================
// VERIFICA LOGIN
// =========================================

if (!token) {

    window.location.href =
        '../login.html';
}


// =========================================
// CARREGAR AGENDAMENTOS
// =========================================

async function carregarAgendamentos() {

    try {

        const resposta = await fetch(

            `${API_URL}/agendamentos`,

            {
                headers: {
                    Authorization:
                        'Bearer ' + token
                }
            }
        );


        const agendamentos =
            await resposta.json();


        const tabela =
            document.getElementById(
                'tabelaAgendamentos'
            );


        // Limpa tabela
        tabela.innerHTML = '';


        // Percorre agendamentos
        agendamentos.forEach(
            (agendamento) => {

                // Converte data
                const dataObj =
                    new Date(
                        agendamento.data_horario
                    );


                // Formata data
                const data =
                    dataObj.toLocaleDateString(
                        'pt-BR'
                    );


                // Formata hora
                const hora =
                    dataObj.toLocaleTimeString(
                        'pt-BR',
                        {
                            hour: '2-digit',
                            minute: '2-digit'
                        }
                    );


                // Cria linha
                const linha =
                    document.createElement('tr');


                // Conteúdo linha
                linha.innerHTML =

                    `
                    <td>
                        ${agendamento.id}
                    </td>

                    <td>
                        ${agendamento.nome || 'Usuário'}
                    </td>

                    <td>
                        ${agendamento.descricao}
                    </td>

                    <td>
                        ${data}
                    </td>

                    <td>
                        ${hora}
                    </td>

                    <td>

                        <button
                            class="btn-editar"
                            onclick="editarAgendamento(${agendamento.id})"
                        >

                            Editar

                        </button>


                        <button
                            class="btn-excluir"
                            onclick="excluirAgendamento(${agendamento.id})"
                        >

                            Excluir

                        </button>

                    </td>
                    `;


                // Adiciona tabela
                tabela.appendChild(
                    linha
                );

            }
        );


    } catch (error) {

        console.error(
            'Erro ao carregar agendamentos:',
            error
        );

    }

}


// =========================================
// EDITAR AGENDAMENTO
// =========================================

function editarAgendamento(id) {

    alert(
        'Futuro editar agendamento ID: ' + id
    );

}


// =========================================
// EXCLUIR AGENDAMENTO
// =========================================

function excluirAgendamento(id) {

    const confirmar =
        confirm(
            'Deseja excluir este agendamento?'
        );


    if (!confirmar) {

        return;
    }


    alert(
        'Futuro DELETE agendamento ID: ' + id
    );

}


// =========================================
// LOGOUT
// =========================================

document.getElementById(
    'logoutBtn'
).addEventListener(
    'click',
    () => {

        localStorage.removeItem(
            'tokenUsuario'
        );

        window.location.href =
            '../login.html';

    }
);


// =========================================
// INICIALIZAÇÃO
// =========================================

carregarAgendamentos();