// =================================
// CLIENTE FÁCIL
// ORÇAMENTOS
// =================================


let itensOrcamento = [];

let orcamentos = JSON.parse(

    localStorage.getItem(
        "orcamentos"
    )

) || [];





// =================================
// ADICIONAR ITEM
// =================================

function adicionarItemOrcamento(){



    const descricao =

    document.getElementById(
        "descricaoOrcamento"
    ).value.trim();



    const valor =

    document.getElementById(
        "valorOrcamento"
    ).value;





    if(descricao === "" || valor === ""){


        alert(

            "Preencha o item e o valor!"

        );


        return;


    }





    itensOrcamento.push({


        descricao: descricao,


        valor: Number(valor)



    });





    mostrarItensOrcamento();



    document.getElementById(
        "descricaoOrcamento"
    ).value = "";



    document.getElementById(
        "valorOrcamento"
    ).value = "";



}// =================================
// MOSTRAR ITENS DO ORÇAMENTO
// =================================

function mostrarItensOrcamento(){


    const lista =

    document.getElementById(
        "listaOrcamentos"
    );



    if(!lista){

        return;

    }



    lista.innerHTML = "";




    itensOrcamento.forEach((item,index)=>{


        let li =

        document.createElement("li");



        li.innerHTML = `


        📄 ${item.descricao}


        <br>


        💰 R$ ${item.valor.toFixed(2)}


        <br><br>


        <button onclick="removerItemOrcamento(${index})">


        🗑️ Remover


        </button>



        `;



        lista.appendChild(li);



    });




}




// =================================
// REMOVER ITEM
// =================================

function removerItemOrcamento(index){


    itensOrcamento.splice(

        index,

        1

    );



    mostrarItensOrcamento();



}




// =================================
// CALCULAR TOTAL
// =================================

function calcularTotalOrcamento(){


    let total = 0;



    itensOrcamento.forEach(item=>{


        total +=

        Number(item.valor) || 0;



    });



    return total;


}// =================================
// GERAR NÚMERO DO ORÇAMENTO
// =================================

function gerarNumeroOrcamento(){


    let numero =

    localStorage.getItem(
        "numeroOrcamento"
    );



    if(!numero){


        numero = 1;


    }else{


        numero =

        Number(numero) + 1;


    }




    localStorage.setItem(

        "numeroOrcamento",

        numero

    );



    return numero;


}





// =================================
// SALVAR ORÇAMENTO
// =================================

function salvarOrcamento(){



    const cliente =

    document.getElementById(
        "clienteOrcamento"
    ).value;





    if(cliente === ""){


        alert(

            "Selecione o cliente!"

        );


        return;


    }





    if(itensOrcamento.length === 0){


        alert(

            "Adicione pelo menos um item!"

        );


        return;


    }





    const numero =

    gerarNumeroOrcamento();




    const novoOrcamento = {



        numero: numero,



        cliente: cliente,



        itens:

        itensOrcamento,



        total:

        calcularTotalOrcamento(),



        data:

        new Date()

        .toLocaleDateString(
            "pt-BR"
        )



    };





    orcamentos.push(

        novoOrcamento

    );





    localStorage.setItem(

        "orcamentos",

        JSON.stringify(
            orcamentos
        )

    );





    alert(

        "Orçamento Nº "

        +

        numero

        +

        " salvo com sucesso!"

    );





    itensOrcamento = [];



    mostrarItensOrcamento();



    mostrarOrcamentosSalvos();



}// =================================
// MOSTRAR ORÇAMENTOS SALVOS
// =================================

function mostrarOrcamentosSalvos(){


    const lista =

    document.getElementById(
        "listaOrcamentos"
    );



    if(!lista){

        return;

    }



    lista.innerHTML = "";





    orcamentos.forEach((orcamento,index)=>{


        let li =

        document.createElement("li");




        li.innerHTML = `


        🧾 Orçamento Nº ${orcamento.numero}


        <br>


        👤 Cliente:

        ${orcamento.cliente}



        <br>


        📅 Data:

        ${orcamento.data}



        <br>


        💰 Total:

        R$ ${orcamento.total.toFixed(2)}



        <br><br>




        <button onclick="gerarPDFOrcamento(${index})">

        📄 PDF

        </button>



        <button onclick="enviarWhatsAppOrcamento(${index})">

        📱 WhatsApp

        </button>



        <button onclick="excluirOrcamento(${index})">

        🗑️ Excluir

        </button>



        `;



        lista.appendChild(li);



    });



}




// =================================
// EXCLUIR ORÇAMENTO
// =================================

function excluirOrcamento(index){



    if(!confirm(

        "Deseja excluir este orçamento?"

    )){


        return;


    }





    orcamentos.splice(

        index,

        1

    );





    localStorage.setItem(

        "orcamentos",

        JSON.stringify(
            orcamentos
        )

    );





    mostrarOrcamentosSalvos();



}// =================================
// GERAR PDF DO ORÇAMENTO
// =================================

function gerarPDFOrcamento(index){



    const orcamento =

    orcamentos[index];



    if(!orcamento){

        return;

    }




    const dadosEmpresa =

    typeof obterDadosEmpresa === "function"

    ?

    obterDadosEmpresa()

    :

    {

        nome:"Minha Empresa",

        telefone:"",

        email:"",

        endereco:""

    };





    const { jsPDF } = window.jspdf;



    const pdf =

    new jsPDF();





    pdf.setFontSize(18);



    pdf.text(

        dadosEmpresa.nome,

        10,

        20

    );





    pdf.setFontSize(12);



    pdf.text(

        "Orçamento Nº "

        +

        orcamento.numero,

        10,

        35

    );





    pdf.text(

        "Cliente: "

        +

        orcamento.cliente,

        10,

        45

    );





    pdf.text(

        "Data: "

        +

        orcamento.data,

        10,

        55

    );





    let y = 70;



    pdf.text(

        "Itens:",

        10,

        y

    );



    y += 10;





    orcamento.itens.forEach(item=>{


        pdf.text(

            item.descricao

            +

            " - R$ "

            +

            item.valor.toFixed(2),

            10,

            y

        );



        y += 10;



    });





    pdf.text(

        "Total: R$ "

        +

        orcamento.total.toFixed(2),

        10,

        y + 10

    );





    pdf.text(

        "Telefone: "

        +

        dadosEmpresa.telefone,

        10,

        y + 25

    );



    pdf.text(

        "Endereço: "

        +

        dadosEmpresa.endereco,

        10,

        y + 35

    );





    pdf.save(

        "orcamento-"

        +

        orcamento.numero

        +

        ".pdf"

    );



}// =================================
// ENVIAR ORÇAMENTO PELO WHATSAPP
// =================================

function enviarWhatsAppOrcamento(index){


    const orcamento =

    orcamentos[index];



    if(!orcamento){

        return;

    }




    const dadosEmpresa =

    typeof obterDadosEmpresa === "function"

    ?

    obterDadosEmpresa()

    :

    {

        nome:"Minha Empresa"

    };





    let mensagem =



    "Olá! Segue o orçamento da "

    +

    dadosEmpresa.nome

    +

    "%0A%0A"

    +

    "🧾 Orçamento Nº "

    +

    orcamento.numero

    +

    "%0A"

    +

    "👤 Cliente: "

    +

    orcamento.cliente

    +

    "%0A%0A";





    orcamento.itens.forEach(item=>{


        mensagem +=


        "📦 "

        +

        item.descricao

        +

        " - R$ "

        +

        item.valor.toFixed(2)

        +

        "%0A";


    });





    mensagem +=



    "%0A💰 Total: R$ "

    +

    orcamento.total.toFixed(2)

    +

    "%0A"

    +

    "Obrigado pela preferência!";





    window.open(


        "https://wa.me/?text="

        +

        mensagem,


        "_blank"


    );



}





// =================================
// LIMPAR ORÇAMENTO
// =================================

function limparOrcamento(){


    itensOrcamento = [];



    document.getElementById(
        "descricaoOrcamento"
    ).value = "";



    document.getElementById(
        "valorOrcamento"
    ).value = "";



    mostrarItensOrcamento();



}





// =================================
// INICIALIZAÇÃO
// =================================

window.addEventListener(
"load",
()=>{


    mostrarOrcamentosSalvos();



});
