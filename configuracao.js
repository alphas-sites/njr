// =================================
// CLIENTE FÁCIL
// CONFIGURAÇÕES DA EMPRESA
// =================================



// =================================
// SALVAR CONFIGURAÇÕES
// =================================

function salvarConfiguracoes(){



    const nome =

    document.getElementById(
        "empresaNome"
    ).value;



    const telefone =

    document.getElementById(
        "empresaTelefone"
    ).value;



    const email =

    document.getElementById(
        "empresaEmail"
    ).value;



    const endereco =

    document.getElementById(
        "empresaEndereco"
    ).value;





    localStorage.setItem(

        "empresaNome",

        nome

    );



    localStorage.setItem(

        "empresaTelefone",

        telefone

    );



    localStorage.setItem(

        "empresaEmail",

        email

    );



    localStorage.setItem(

        "empresaEndereco",

        endereco

    );





    if(typeof carregarEmpresaLogada === "function"){


        carregarEmpresaLogada();


    }





    alert(

        "Configurações salvas!"

    );



}// =================================
// CARREGAR CONFIGURAÇÕES
// =================================

function carregarConfiguracoes(){



    const nome =

    document.getElementById(
        "empresaNome"
    );



    const telefone =

    document.getElementById(
        "empresaTelefone"
    );



    const email =

    document.getElementById(
        "empresaEmail"
    );



    const endereco =

    document.getElementById(
        "empresaEndereco"
    );





    if(nome){


        nome.value =

        localStorage.getItem(
            "empresaNome"
        ) || "";



    }




    if(telefone){


        telefone.value =

        localStorage.getItem(
            "empresaTelefone"
        ) || "";



    }




    if(email){


        email.value =

        localStorage.getItem(
            "empresaEmail"
        ) || "";



    }




    if(endereco){


        endereco.value =

        localStorage.getItem(
            "empresaEndereco"
        ) || "";



    }



}// =================================
// OBTER DADOS DA EMPRESA
// =================================

function obterDadosEmpresa(){


    return {


        nome:

        localStorage.getItem(
            "empresaNome"
        ) || "Minha Empresa",



        telefone:

        localStorage.getItem(
            "empresaTelefone"
        ) || "",



        email:

        localStorage.getItem(
            "empresaEmail"
        ) || "",



        endereco:

        localStorage.getItem(
            "empresaEndereco"
        ) || ""



    };


}




// =================================
// VALIDAR CONFIGURAÇÕES
// =================================

function empresaConfigurada(){


    const dados =

    obterDadosEmpresa();




    if(

        dados.nome === ""

    ){


        return false;


    }



    return true;


}




// =================================
// LIMPAR CONFIGURAÇÕES
// =================================

function limparConfiguracoes(){



    if(!confirm(

        "Deseja apagar os dados da empresa?"

    )){


        return;


    }





    localStorage.removeItem(
        "empresaNome"
    );



    localStorage.removeItem(
        "empresaTelefone"
    );



    localStorage.removeItem(
        "empresaEmail"
    );



    localStorage.removeItem(
        "empresaEndereco"
    );



    carregarConfiguracoes();



}// =================================
// INICIALIZAÇÃO
// =================================

window.addEventListener(
"load",
()=>{


    carregarConfiguracoes();



});
