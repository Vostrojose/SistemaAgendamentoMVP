/*
Projeto PI Senac 2026 - v1 "Front-end"
dascrição: Dashboard Admin
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
// CARREGAR USUÁRIOS
// =========================================

async function carregarUsuarios() {

    try {

        const resposta = await fetch(

            `${API_URL}/usuarios/retornaUsuarios`,

            {
                headers: {
                    Authorization:
                        'Bearer ' + token
                }
            }
        );

        const resultado =
            await resposta.json();


        document.getElementById(
            'totalUsuarios'
        ).innerText =

            resultado.message.length;


    } catch (error) {

        console.error(
            'Erro ao carregar usuários:',
            error
        );

    }

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


        const resultado =
            await resposta.json();


        document.getElementById(
            'totalAgendamentos'
        ).innerText =

            resultado.length;


    } catch (error) {

        console.error(
            'Erro ao carregar agendamentos:',
            error
        );

    }

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

carregarAgendamentos();