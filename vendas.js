// =================================
// CLIENTE FÁCIL
// VENDAS
// =================================


let vendas = JSON.parse(

    localStorage.getItem("vendas")

) || [];




// =================================
// SALVAR VENDA
// =================================

function salvarVenda(){


    const cliente =

    document.getElementById(
        "clienteVenda"
    ).value.trim();



    const produto =

    document.getElementById(
        "produtoVenda"
    ).value.trim();



    const valor =

    document.getElementById(
        "valorVenda"
    ).value;





    if(cliente === "" || produto === "" || valor === ""){


        alert(
            "Preencha todos os campos!"
        );


        return;


    }




    // retirar estoque

    if(typeof retirarEstoque === "function"){


        retirarEstoque(
            produto,
            1
        );


    }




    vendas.push({


        cliente: cliente,


        produto: produto,


        valor: Number(valor),


        data:

        new Date()

        .toLocaleDateString("pt-BR")



    });





    localStorage.setItem(

        "vendas",

        JSON.stringify(vendas)

    );





    limparCamposVenda();



    mostrarVendas();




    if(typeof atualizarDashboard === "function"){


        atualizarDashboard();


    }




    alert(

        "Venda registrada com sucesso!"

    );


}// =================================
// MOSTRAR VENDAS
// =================================

function mostrarVendas(){


    const lista =

    document.getElementById(
        "listaVendas"
    );



    if(!lista){

        return;

    }



    lista.innerHTML = "";





    vendas.forEach((venda,index)=>{


        let li =

        document.createElement("li");




        li.innerHTML = `


        <strong>

        💰 Venda

        </strong>


        <br>


        👤 Cliente:

        ${venda.cliente}



        <br>


        📦 Produto:

        ${venda.produto}



        <br>


        💵 Valor:

        R$ ${venda.valor.toFixed(2)}



        <br>


        📅 Data:

        ${venda.data}



        <br><br>




        <button onclick="excluirVenda(${index})">

        🗑️ Excluir

        </button>



        `;




        lista.appendChild(li);



    });



}



// =================================
// EXCLUIR VENDA
// =================================

function excluirVenda(index){



    if(!confirm(

        "Deseja excluir esta venda?"

    )){


        return;


    }





    vendas.splice(

        index,

        1

    );





    salvarVendas();



}



// =================================
// SALVAR VENDAS
// =================================

function salvarVendas(){


    localStorage.setItem(

        "vendas",

        JSON.stringify(vendas)

    );



    mostrarVendas();



    if(typeof atualizarDashboard === "function"){


        atualizarDashboard();


    }


}// =================================
// LIMPAR CAMPOS
// =================================

function limparCamposVenda(){


    document.getElementById(
        "clienteVenda"
    ).value = "";



    document.getElementById(
        "produtoVenda"
    ).value = "";



    document.getElementById(
        "valorVenda"
    ).value = "";



}




// =================================
// PESQUISAR VENDAS
// =================================

function pesquisarVendas(){


    const pesquisa =

    document.getElementById(
        "pesquisaVenda"
    );



    if(!pesquisa){

        return;

    }



    const texto =

    pesquisa.value.toLowerCase();




    const lista =

    document.getElementById(
        "listaVendas"
    );



    lista.innerHTML = "";





    vendas.forEach((venda,index)=>{


        if(


            venda.cliente

            .toLowerCase()

            .includes(texto)


            ||


            venda.produto

            .toLowerCase()

            .includes(texto)


        ){



            let li =

            document.createElement("li");



            li.innerHTML = `


            👤 ${venda.cliente}

            <br>

            📦 ${venda.produto}

            <br>

            💰 R$ ${venda.valor.toFixed(2)}

            <br>

            📅 ${venda.data}


            <br><br>


            <button onclick="excluirVenda(${index})">

            🗑️ Excluir

            </button>


            `;



            lista.appendChild(li);



        }


    });


}




// =================================
// CALCULAR TOTAL VENDIDO
// =================================

function totalVendas(){


    let total = 0;



    vendas.forEach(venda=>{


        total +=

        Number(venda.valor) || 0;



    });



    return total;


}// =================================
// CARREGAR CLIENTES NAS VENDAS
// =================================

function carregarClientesVenda(){


    const campo =

    document.getElementById(
        "clienteVenda"
    );



    if(!campo){

        return;

    }



    if(typeof listarClientes !== "function"){

        return;

    }



    const listaClientes =

    listarClientes();



    campo.innerHTML = "";



    campo.placeholder =
    "Selecione o cliente";



    listaClientes.forEach(cliente=>{


        let option =

        document.createElement(
            "option"
        );



        option.value =

        cliente.nome;



        option.textContent =

        cliente.nome;



        campo.appendChild(option);



    });



}




// =================================
// CARREGAR PRODUTOS NAS VENDAS
// =================================

function carregarProdutosVenda(){


    const campo =

    document.getElementById(
        "produtoVenda"
    );



    if(!campo){

        return;

    }



    if(typeof listarProdutos !== "function"){

        return;

    }



    const listaProdutos =

    listarProdutos();



    campo.innerHTML = "";



    campo.placeholder =
    "Selecione o produto";




    listaProdutos.forEach(produto=>{


        let option =

        document.createElement(
            "option"
        );



        option.value =

        produto.nome;



        option.textContent =

        produto.nome;



        campo.appendChild(option);



    });



}// =================================
// PREENCHER VALOR DO PRODUTO
// =================================

function preencherValorProduto(){


    const produtoSelecionado =

    document.getElementById(
        "produtoVenda"
    ).value;



    if(typeof buscarProduto !== "function"){

        return;

    }




    const produto =

    buscarProduto(
        produtoSelecionado
    );




    if(produto){


        document.getElementById(
            "valorVenda"
        ).value = produto.preco;



    }



}




// =================================
// VERIFICAR ESTOQUE ANTES DA VENDA
// =================================

function verificarEstoqueVenda(produtoNome){


    if(typeof buscarProduto !== "function"){


        return true;


    }




    const produto =

    buscarProduto(
        produtoNome
    );




    if(!produto){


        alert(
            "Produto não encontrado!"
        );


        return false;


    }





    if(produto.estoque <= 0){


        alert(

            "Produto sem estoque!"

        );



        return false;


    }





    return true;


}




// =================================
// INTEGRAR VALIDAÇÃO
// =================================

const salvarVendaOriginal = salvarVenda;



salvarVenda = function(){



    const produto =

    document.getElementById(
        "produtoVenda"
    ).value;



    if(!verificarEstoqueVenda(produto)){


        return;


    }




    salvarVendaOriginal();



};// =================================
// ATUALIZAR VENDAS
// =================================

function atualizarVendas(){


    vendas = JSON.parse(

        localStorage.getItem(
            "vendas"
        )

    ) || [];



    mostrarVendas();



    if(typeof atualizarDashboard === "function"){


        atualizarDashboard();


    }


}




// =================================
// QUANTIDADE DE VENDAS
// =================================

function quantidadeVendas(){


    return vendas.length;


}




// =================================
// LISTAR VENDAS
// =================================

function listarVendas(){


    return vendas;


}




// =================================
// INICIALIZAÇÃO
// =================================

window.addEventListener(
"load",
()=>{


    atualizarVendas();



    carregarClientesVenda();



    carregarProdutosVenda();



});
