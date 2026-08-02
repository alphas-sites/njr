// =================================
// CLIENTE FÁCIL
// DASHBOARD
// =================================


// =================================
// CARREGAR DADOS
// =================================

function carregarDadosDashboard(){


    const clientes = JSON.parse(

        localStorage.getItem("clientes")

    ) || [];



    const produtos = JSON.parse(

        localStorage.getItem("produtos")

    ) || [];



    const vendas = JSON.parse(

        localStorage.getItem("vendas")

    ) || [];



    const orcamentos = JSON.parse(

        localStorage.getItem("orcamentos")

    ) || [];



    return {

        clientes,

        produtos,

        vendas,

        orcamentos

    };


}// =================================
// ATUALIZAR CARDS
// =================================

function atualizarCardsDashboard(){


    const dados =

    carregarDadosDashboard();




    // CLIENTES

    const clientes =

    document.getElementById(
        "totalClientes"
    );



    if(clientes){


        clientes.innerHTML =

        dados.clientes.length;


    }





    // PRODUTOS

    const produtos =

    document.getElementById(
        "totalProdutos"
    );



    if(produtos){


        produtos.innerHTML =

        dados.produtos.length;


    }





    // VENDAS

    const vendas =

    document.getElementById(
        "totalVendas"
    );



    if(vendas){


        vendas.innerHTML =

        dados.vendas.length;


    }





    // ORÇAMENTOS

    const orcamentos =

    document.getElementById(
        "totalOrcamentos"
    );



    if(orcamentos){


        orcamentos.innerHTML =

        dados.orcamentos.length;


    }


}// =================================
// FATURAMENTO
// =================================

function atualizarFaturamentoDashboard(){


    const dados =

    carregarDadosDashboard();



    let total = 0;



    dados.vendas.forEach(venda=>{


        total +=

        Number(venda.valor) || 0;



    });




    const campo =

    document.getElementById(
        "totalFaturamento"
    );



    if(campo){


        campo.innerHTML =

        "R$ " +

        total.toFixed(2);



    }



}




// =================================
// ALERTA DE ESTOQUE
// =================================

function verificarEstoqueBaixo(){


    const dados =

    carregarDadosDashboard();



    let baixos = [];




    dados.produtos.forEach(produto=>{


        if(

            Number(produto.estoque)

            <= 5

        ){


            baixos.push(produto);



        }



    });





    const alerta =

    document.getElementById(
        "alertaEstoque"
    );



    if(alerta){



        if(baixos.length > 0){


            alerta.innerHTML =


            "⚠️ Produtos com estoque baixo: "

            +

            baixos.length;



        }else{


            alerta.innerHTML =

            "✅ Estoque normal";



        }


    }



}// =================================
// ATUALIZAR DASHBOARD COMPLETO
// =================================

function atualizarDashboardCompleto(){


    atualizarCardsDashboard();


    atualizarFaturamentoDashboard();


    verificarEstoqueBaixo();


}




// =================================
// INICIAR DASHBOARD
// =================================

window.addEventListener(
"load",
()=>{


    atualizarDashboardCompleto();



});




// =================================
// ATUALIZAÇÃO AUTOMÁTICA
// =================================

window.addEventListener(
"storage",
()=>{


    atualizarDashboardCompleto();


});
