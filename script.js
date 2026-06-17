let alunos =
JSON.parse(localStorage.getItem("alunos")) || [];

function mostrarTela(id){

    document
    .querySelectorAll("section")
    .forEach(sec =>
        sec.classList.add("oculto")
    );

    document
    .getElementById(id)
    .classList.remove("oculto");
}

function salvarAluno(){

    const nome =
    document.getElementById("nome").value;

    const matricula =
    document.getElementById("matricula").value;

    if(nome === "" || matricula === ""){
        alert("Preencha os campos obrigatórios");
        return;
    }

    const existe =
    alunos.find(
        aluno => aluno.nome === nome
    );

    if(existe){
        alert("Aluno já cadastrado");
        return;
    }

    alunos.push({

        nome,

        matricula,

        idade:
        document.getElementById("idade").value,

        curso:
        document.getElementById("curso").value,

        escola:
        document.getElementById("escola").value

    });

    localStorage.setItem(
        "alunos",
        JSON.stringify(alunos)
    );

    listarAlunos();

    mostrarTela("lista");
}

function listarAlunos(){

    const busca =
    document
    .getElementById("busca")
    ?.value
    .toLowerCase() || "";

    const tabela =
    document.getElementById("tabela");

    tabela.innerHTML = "";

    alunos
    .filter(a =>
        a.nome.toLowerCase()
        .includes(busca)
    )
    .forEach((aluno,index)=>{

        tabela.innerHTML += `
        <tr>
            <td>${aluno.nome}</td>
            <td>${aluno.matricula}</td>
            <td>${aluno.curso}</td>

            <td>

                <button
                onclick="editarAluno(${index})">
                ✏️
                </button>

                <button
                onclick="excluirAluno(${index})">
                🗑️
                </button>

            </td>
        </tr>
        `;
    });
}

function excluirAluno(index){

    alunos.splice(index,1);

    localStorage.setItem(
        "alunos",
        JSON.stringify(alunos)
    );

    listarAlunos();
}

function editarAluno(index){

    const novoNome =
    prompt(
        "Novo nome:",
        alunos[index].nome
    );

    if(novoNome){

        alunos[index].nome = novoNome;

        localStorage.setItem(
            "alunos",
            JSON.stringify(alunos)
        );

        listarAlunos();
    }
}

listarAlunos();

const uploadFoto = document.getElementById("uploadFoto");
const fotoPerfil = document.getElementById("fotoPerfil");

uploadFoto.addEventListener("change", function() {
    const arquivo = this.files[0];

    if (arquivo) {
        const leitor = new FileReader();

        leitor.onload = function(e) {
            fotoPerfil.src = e.target.result;
        };

        leitor.readAsDataURL(arquivo);
    }
});
