/*
Projeto PI Senac 2026 - v1 "Front-end"
 Autor: [grupo 31]
 Descrição: Formulário novo agendamento
*/


// =========================================
// TOKEN
// =========================================

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
// CARREGAR USUÁRIOS
// =========================================

async function carregarUsuarios() {

    try {

        const resposta = await fetch(
            '/usuarios/retornaUsuarios'
        );


        const resultado =
            await resposta.json();


        const tabela =
            document.getElementById(
                'tabelaUsuarios'
            );


        // Limpa tabela
        tabela.innerHTML = '';


        // Percorre usuários
        resultado.message.forEach(
            (usuario) => {

                // Cria linha
                const linha =
                    document.createElement('tr');


                // Conteúdo linha
                linha.innerHTML =

                    `
                    <td>
                        ${usuario.id}
                    </td>

                    <td>
                        ${usuario.nome}
                    </td>

                    <td>
                        ${usuario.email}
                    </td>

                    <td>
                        ${usuario.tipo}
                    </td>

                    <td>

                        <button
                            class="btn-editar"
                            onclick="editarUsuario(${usuario.id})"
                        >

                            Editar

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
            'Erro ao carregar usuários:',
            error
        );

    }

}


// =========================================
// EDITAR USUÁRIO
// =========================================

function editarUsuario(id) {

    window.location.href =

        `editarUsuario.html?id=${id}`;

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

carregarUsuarios();