// =================================
// CLIENTE FÁCIL
// LOGIN
// =================================



// =================================
// ABRIR CADASTRO
// =================================

function abrirCadastro(){


    document.getElementById(
        "login"
    ).classList.add(
        "escondido"
    );



    document.getElementById(
        "cadastro"
    ).classList.remove(
        "escondido"
    );


}




// =================================
// VOLTAR LOGIN
// =================================

function voltarLogin(){


    document.getElementById(
        "cadastro"
    ).classList.add(
        "escondido"
    );



    document.getElementById(
        "login"
    ).classList.remove(
        "escondido"
    );


}// =================================
// CRIAR CONTA
// =================================

function criarConta(){



    const empresa =

    document.getElementById(
        "nomeEmpresa"
    ).value.trim();



    const usuario =

    document.getElementById(
        "novoUsuario"
    ).value.trim();



    const senha =

    document.getElementById(
        "novaSenha"
    ).value.trim();





    if(

        empresa === ""

        ||

        usuario === ""

        ||

        senha === ""

    ){


        alert(

            "Preencha todos os campos!"

        );


        return;


    }






    localStorage.setItem(

        "empresaNome",

        empresa

    );



    localStorage.setItem(

        "usuario",

        usuario

    );



    localStorage.setItem(

        "senha",

        senha

    );





    alert(

        "Conta criada com sucesso!"

    );





    voltarLogin();



}// =================================
// LOGIN
// =================================

function login(){



    const usuarioDigitado =

    document.getElementById(
        "usuario"
    ).value.trim();




    const senhaDigitada =

    document.getElementById(
        "senha"
    ).value.trim();





    const usuarioSalvo =

    localStorage.getItem(
        "usuario"
    );




    const senhaSalva =

    localStorage.getItem(
        "senha"
    );







    if(

        usuarioDigitado === usuarioSalvo

        &&

        senhaDigitada === senhaSalva

    ){



        abrirSistema();



    }else{



        alert(

            "Usuário ou senha incorretos!"

        );



    }



}// =================================
// MANTER LOGIN
// =================================

function salvarSessao(){


    localStorage.setItem(

        "logado",

        "true"

    );


}




// =================================
// VERIFICAR LOGIN SALVO
// =================================

function verificarLogin(){



    const logado =

    localStorage.getItem(
        "logado"
    );



    if(logado === "true"){


        abrirSistema();



    }



}




// =================================
// SAIR DA CONTA
// =================================

function sairConta(){



    localStorage.removeItem(

        "logado"

    );



    document.getElementById(
        "sistema"
    ).classList.add(
        "escondido"
    );



    document.getElementById(
        "login"
    ).classList.remove(
        "escondido"
    );



}// =================================
// LIMPAR CAMPOS DE LOGIN
// =================================

function limparLogin(){


    document.getElementById(
        "usuario"
    ).value = "";



    document.getElementById(
        "senha"
    ).value = "";



}



// =================================
// INICIALIZAÇÃO DO LOGIN
// =================================

window.addEventListener(
"load",
()=>{


    verificarLogin();



});
