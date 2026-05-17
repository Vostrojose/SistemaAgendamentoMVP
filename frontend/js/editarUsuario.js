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
// PEGAR ID DA URL
// =========================================

const parametros =
    new URLSearchParams(
        window.location.search
    );


const idUsuario =
    parametros.get('id');


// =========================================
// CARREGAR USUÁRIO
// =========================================

async function carregarUsuario() {

    try {

        const resposta = await fetch(
            '/usuarios/retornaUsuarios'
        );


        const resultado =
            await resposta.json();


        // Procura usuário
        const usuario =
            resultado.message.find(
                item =>
                    item.id == idUsuario
            );


        // Verifica usuário
        if (!usuario) {

            alert(
                'Usuário não encontrado'
            );

            return;
        }


        // Preenche campos
        document.getElementById(
            'nome'
        ).value = usuario.nome;


        document.getElementById(
            'email'
        ).value = usuario.email;


        document.getElementById(
            'tipo'
        ).value = usuario.tipo;


    } catch (error) {

        console.error(
            'Erro ao carregar usuário:',
            error
        );

    }

}


// =========================================
// FORMULÁRIO
// =========================================

document.getElementById(
    'formEditarUsuario'
).addEventListener(
    'submit',
    async (event) => {

        event.preventDefault();


        // Dados formulário
        const dados = {

            nome:
                document.getElementById(
                    'nome'
                ).value,

            email:
                document.getElementById(
                    'email'
                ).value,

            tipo:
                document.getElementById(
                    'tipo'
                ).value

        };


        // FUTURO UPDATE
        console.log(
            'Futuro PUT usuário:',
            idUsuario,
            dados
        );


        // Mensagem temporária
        document.getElementById(
            'mensagem'
        ).innerText =

            'Futuro update usuário';


    }
);


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

carregarUsuario();