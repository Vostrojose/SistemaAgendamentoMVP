/*
=================================================
RELATORIOS.JS
SistemaAgendamento_MVP
Tela administrativa de relatórios
=================================================
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
// CARREGAR TOTAL USUÁRIOS
// =========================================

async function carregarUsuarios() {

    try {

        const resposta = await fetch(
            '/usuarios/retornaUsuarios'
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
// CARREGAR TOTAL AGENDAMENTOS
// =========================================

async function carregarAgendamentos() {

    try {

        const resposta = await fetch(
            '/agendamentos'
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