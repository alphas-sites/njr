// =================================
// CLIENTE FÁCIL - CLIENTES
// =================================


let clientes = JSON.parse(localStorage.getItem("clientes")) || [];

let clienteEditando = null;




// Salvar cliente

function salvarCliente(){


    let nome = document.getElementById("nomeCliente").value;

    let telefone = document.getElementById("telefoneCliente").value;

    let email = document.getElementById("emailCliente").value;



    if(nome === ""){

        alert("Digite o nome do cliente!");

        return;

    }



    let cliente = {

        nome:nome,

        telefone:telefone,

        email:email

    };



    if(clienteEditando !== null){


        clientes[clienteEditando] = cliente;


        clienteEditando = null;


    }else{


        clientes.push(cliente);


    }



    localStorage.setItem(
        "clientes",
        JSON.stringify(clientes)
    );



    mostrarClientes();

    limparCliente();

    atualizarDashboard();


}




// Mostrar clientes

function mostrarClientes(){


    let lista = document.getElementById("listaClientes");


    lista.innerHTML = "";



    clientes.forEach(function(cliente,index){



        let item = document.createElement("li");



        item.innerHTML = `

        <strong>${cliente.nome}</strong><br>

        📞 ${cliente.telefone}<br>

        ✉️ ${cliente.email}

        <br><br>


        <button onclick="editarCliente(${index})">

        ✏️ Editar

        </button>


        <button onclick="excluirCliente(${index})">

        🗑️ Excluir

        </button>


        `;



        lista.appendChild(item);



    });



}




// Editar cliente

function editarCliente(index){


    let cliente = clientes[index];


    document.getElementById("nomeCliente").value = cliente.nome;

    document.getElementById("telefoneCliente").value = cliente.telefone;

    document.getElementById("emailCliente").value = cliente.email;


    clienteEditando = index;


}




// Excluir cliente

function excluirCliente(index){


    let confirmar = confirm(
        "Deseja excluir este cliente?"
    );



    if(confirmar){


        clientes.splice(index,1);



        localStorage.setItem(
            "clientes",
            JSON.stringify(clientes)
        );



        mostrarClientes();


        atualizarDashboard();


    }



}




// Limpar campos

function limparCliente(){


    document.getElementById("nomeCliente").value = "";

    document.getElementById("telefoneCliente").value = "";

    document.getElementById("emailCliente").value = "";


}


function pesquisarClientes(){

    let pesquisa = document
        .getElementById("pesquisaCliente")
        .value
        .toLowerCase();

    let lista = document.getElementById("listaClientes");

    lista.innerHTML = "";

    clientes.forEach(function(cliente, index){

        if(
            cliente.nome.toLowerCase().includes(pesquisa)
        ){

            let item = document.createElement("li");

            item.innerHTML = `
                <strong>${cliente.nome}</strong><br>
                📞 ${cliente.telefone}<br>
                ✉️ ${cliente.email}<br><br>

                <button onclick="editarCliente(${index})">
                    ✏️ Editar
                </button>

                <button onclick="excluirCliente(${index})">
                    🗑️ Excluir
                </button>
            `;

            lista.appendChild(item);

        }

    });

}
