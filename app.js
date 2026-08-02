// =================================
// CLIENTE FÁCIL
// CONTROLE DO SISTEMA
// =================================


// =================================
// ABRIR PÁGINAS
// =================================

function abrirPagina(nome){


    const paginas =

    document.querySelectorAll(".pagina");



    paginas.forEach(pagina=>{


        pagina.classList.add(
            "escondido"
        );


    });



    const paginaAtual =

    document.getElementById(nome);



    if(paginaAtual){


        paginaAtual.classList.remove(
            "escondido"
        );


    }



}// =================================
// MOSTRAR SISTEMA
// =================================

function abrirSistema(){


    document.getElementById(
        "login"
    ).classList.add(
        "escondido"
    );



    document.getElementById(
        "cadastro"
    ).classList.add(
        "escondido"
    );



    document.getElementById(
        "sistema"
    ).classList.remove(
        "escondido"
    );



    abrirPagina(
        "dashboard"
    );



    carregarEmpresaLogada();


}



// =================================
// SAIR DO SISTEMA
// =================================

function sair(){


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



}



// =================================
// EMPRESA LOGADA
// =================================

function carregarEmpresaLogada(){


    const empresa =

    localStorage.getItem(
        "empresaNome"
    );



    const campo =

    document.getElementById(
        "empresaLogada"
    );



    if(campo){


        if(empresa){


            campo.innerHTML =

            "Empresa: " + empresa;


        }else{


            campo.innerHTML =

            "Bem-vindo";


        }


    }



}// =================================
// ATUALIZAR DASHBOARD
// =================================

function atualizarDashboard(){



    // CLIENTES

    const clientes = JSON.parse(

        localStorage.getItem(
            "clientes"
        )

    ) || [];




    const totalClientes =

    document.getElementById(
        "totalClientes"
    );



    if(totalClientes){


        totalClientes.innerHTML =

        clientes.length;


    }





    // PRODUTOS

    const produtos = JSON.parse(

        localStorage.getItem(
            "produtos"
        )

    ) || [];




    const totalProdutos =

    document.getElementById(
        "totalProdutos"
    );



    if(totalProdutos){


        totalProdutos.innerHTML =

        produtos.length;


    }





    // VENDAS

    const vendas = JSON.parse(

        localStorage.getItem(
            "vendas"
        )

    ) || [];




    const totalVendas =

    document.getElementById(
        "totalVendas"
    );



    if(totalVendas){


        totalVendas.innerHTML =

        vendas.length;


    }





    // FATURAMENTO

    let faturamento = 0;



    vendas.forEach(venda=>{


        faturamento +=

        Number(venda.valor) || 0;



    });




    const totalFaturamento =

    document.getElementById(
        "totalFaturamento"
    );



    if(totalFaturamento){


        totalFaturamento.innerHTML =

        "R$ " +

        faturamento.toFixed(2);



    }


}// =================================
// DATA DO DASHBOARD
// =================================

function mostrarDataHoje(){


    const campo =

    document.getElementById(
        "dataHoje"
    );



    if(campo){


        let data =

        new Date()
        .toLocaleDateString(
            "pt-BR",
            {
                weekday:"long",
                day:"2-digit",
                month:"long",
                year:"numeric"
            }
        );



        campo.innerHTML =

        data;


    }


}



// =================================
// INICIAR SISTEMA
// =================================

window.addEventListener(
"load",
()=>{


    mostrarDataHoje();



    atualizarDashboard();



});
