// =================================
// CLIENTE FÁCIL
// PRODUTOS
// =================================


let produtos = JSON.parse(

    localStorage.getItem("produtos")

) || [];




// =================================
// SALVAR PRODUTO
// =================================

function salvarProduto(){


    const nome =

    document.getElementById(
        "nomeProduto"
    ).value.trim();



    const preco =

    document.getElementById(
        "precoProduto"
    ).value;



    const estoque =

    document.getElementById(
        "estoqueProduto"
    ).value;





    if(nome === ""){


        alert(
            "Digite o nome do produto!"
        );


        return;


    }





    produtos.push({


        nome: nome,


        preco: Number(preco),


        estoque: Number(estoque)



    });





    localStorage.setItem(

        "produtos",

        JSON.stringify(produtos)

    );





    limparCamposProduto();



    mostrarProdutos();




    if(typeof atualizarDashboard === "function"){


        atualizarDashboard();


    }



    alert(
        "Produto salvo com sucesso!"
    );


}// =================================
// MOSTRAR PRODUTOS
// =================================

function mostrarProdutos(){


    const lista =

    document.getElementById(
        "listaProdutos"
    );



    if(!lista){

        return;

    }



    lista.innerHTML = "";





    produtos.forEach((produto,index)=>{


        let li =

        document.createElement("li");




        li.innerHTML = `


        <strong>

        📦 ${produto.nome}

        </strong>


        <br>


        💰 R$ ${produto.preco.toFixed(2)}



        <br>


        📊 Estoque:

        ${produto.estoque}



        <br><br>




        <button onclick="editarProduto(${index})">

        ✏️ Editar

        </button>




        <button onclick="excluirProduto(${index})">

        🗑️ Excluir

        </button>



        `;




        lista.appendChild(li);



    });



}



// =================================
// EDITAR PRODUTO
// =================================

function editarProduto(index){



    const produto =

    produtos[index];





    document.getElementById(
        "nomeProduto"
    ).value = produto.nome;




    document.getElementById(
        "precoProduto"
    ).value = produto.preco;




    document.getElementById(
        "estoqueProduto"
    ).value = produto.estoque;




    produtos.splice(
        index,
        1
    );




    salvarProdutos();



}



// =================================
// EXCLUIR PRODUTO
// =================================

function excluirProduto(index){



    if(!confirm(

        "Deseja excluir este produto?"

    )){


        return;


    }





    produtos.splice(

        index,

        1

    );





    salvarProdutos();



}// =================================
// SALVAR ALTERAÇÕES DOS PRODUTOS
// =================================

function salvarProdutos(){


    localStorage.setItem(

        "produtos",

        JSON.stringify(produtos)

    );



    mostrarProdutos();



    if(typeof atualizarDashboard === "function"){


        atualizarDashboard();


    }



}



// =================================
// LIMPAR CAMPOS
// =================================

function limparCamposProduto(){


    document.getElementById(
        "nomeProduto"
    ).value = "";



    document.getElementById(
        "precoProduto"
    ).value = "";



    document.getElementById(
        "estoqueProduto"
    ).value = "";



    const pesquisa =

    document.getElementById(
        "pesquisaProduto"
    );



    if(pesquisa){


        pesquisa.value = "";


    }


}




// =================================
// PESQUISAR PRODUTOS
// =================================

function pesquisarProdutos(){



    const pesquisa =

    document.getElementById(
        "pesquisaProduto"
    ).value.toLowerCase();




    const lista =

    document.getElementById(
        "listaProdutos"
    );




    lista.innerHTML = "";





    produtos.forEach((produto,index)=>{


        if(

            produto.nome

            .toLowerCase()

            .includes(pesquisa)

        ){



            let li =

            document.createElement("li");




            li.innerHTML = `


            <strong>

            📦 ${produto.nome}

            </strong>


            <br>


            💰 R$ ${produto.preco.toFixed(2)}


            <br>


            📊 Estoque:

            ${produto.estoque}


            <br><br>


            <button onclick="editarProduto(${index})">

            ✏️ Editar

            </button>



            <button onclick="excluirProduto(${index})">

            🗑️ Excluir

            </button>



            `;




            lista.appendChild(li);



        }



    });



}// =================================
// VERIFICAR ESTOQUE BAIXO
// =================================

function produtosEstoqueBaixo(){


    return produtos.filter(produto =>

        Number(produto.estoque) <= 5

    );


}




// =================================
// BUSCAR PRODUTO PELO NOME
// =================================

function buscarProduto(nome){


    return produtos.find(produto =>


        produto.nome.toLowerCase() ===

        nome.toLowerCase()


    );


}




// =================================
// RETIRAR ESTOQUE
// =================================

function retirarEstoque(nome, quantidade){


    const produto =

    buscarProduto(nome);




    if(!produto){


        return false;


    }





    if(produto.estoque < quantidade){


        alert(

            "Estoque insuficiente!"

        );


        return false;


    }





    produto.estoque -= quantidade;



    salvarProdutos();



    return true;


}




// =================================
// ADICIONAR ESTOQUE
// =================================

function adicionarEstoque(nome, quantidade){


    const produto =

    buscarProduto(nome);




    if(!produto){


        return false;


    }





    produto.estoque += quantidade;



    salvarProdutos();



    return true;


}// =================================
// ATUALIZAR PRODUTOS
// =================================

function atualizarProdutos(){


    produtos = JSON.parse(

        localStorage.getItem(
            "produtos"
        )

    ) || [];



    mostrarProdutos();



    if(typeof atualizarDashboard === "function"){


        atualizarDashboard();


    }



}



// =================================
// QUANTIDADE DE PRODUTOS
// =================================

function quantidadeProdutos(){


    return produtos.length;


}




// =================================
// OBTER PRODUTO
// =================================

function obterProduto(index){


    if(

        index < 0 ||

        index >= produtos.length

    ){


        return null;


    }



    return produtos[index];


}




// =================================
// ÚLTIMO PRODUTO CADASTRADO
// =================================

function ultimoProduto(){



    if(produtos.length === 0){


        return null;


    }



    return produtos[

        produtos.length - 1

    ];


}// =================================
// INICIALIZAÇÃO DOS PRODUTOS
// =================================

window.addEventListener(
"load",
()=>{


    atualizarProdutos();



});




// =================================
// LISTAR PRODUTOS
// =================================

function listarProdutos(){


    return produtos;


}




// =================================
// EXISTE PRODUTO
// =================================

function existeProduto(nome){


    return produtos.some(produto =>


        produto.nome.toLowerCase() ===

        nome.toLowerCase()


    );


}




// =================================
// TOTAL EM ESTOQUE
// =================================

function totalEstoque(){


    let total = 0;



    produtos.forEach(produto=>{


        total +=

        Number(produto.estoque) || 0;



    });



    return total;


}
