let alunos = 
JSON.parse(localStorage.getItem("alunos")) || [];

function mostrarTela(id){
    if(
        (id === "cadastro" || id === "lista") &&
        localStorage.getItem("logado") !== "true"
    ){

        alert("Faça login primeiro!");
        id = "login";

    }

    document
    .querySelectorAll("section")
    .forEach(sec => {
        sec.classList.add("oculto");

    });

    document
    .getElementById(id)
    .classList.remove("oculto");

}

function cadastrarUsuario(){
    const usuario =
    document.getElementById("novoUsuario").value;
    const senha =
    document.getElementById("novaSenha").value;

    if(usuario === "" || senha === ""){
        alert("Preencha todos os campos");
        return;
    }

    localStorage.setItem(
        "usuario",
        JSON.stringify({
            usuario: usuario,
            senha: senha

        })

    );
    alert("Usuário criado com sucesso!");
    mostrarTela("login");
}

function fazerLogin(){
    const usuario =
    document.getElementById("usuario").value;
    const senha =
    document.getElementById("senha").value;
    const dados =
    JSON.parse(
        localStorage.getItem("usuario")

    );
    if(!dados){
        alert("Crie uma conta primeiro!");
        mostrarTela("cadastroUsuario");
        return;
    }

    if(

        usuario === dados.usuario &&
        senha === dados.senha

    ){
        localStorage.setItem(
            "logado",
            "true"
        );

        alert("Login realizado!");
        mostrarTela("home");
    }else{
        alert("Usuário ou senha incorretos");
    }
}

function logout(){
    localStorage.removeItem("logado");
    alert("Logout realizado!");
    mostrarTela("login");

}

function salvarAluno(){
    const nome =
    document.getElementById("nome").value;
    const matricula =
    document.getElementById("matricula").value;
    if(nome === "" || matricula === ""){
        alert("Preencha nome e matrícula");
        return;
    }
    const existe = alunos.find(
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
        document.getElementById("escola").value,
        foto:
        document.getElementById("fotoPerfil").src

    });

    localStorage.setItem(
        "alunos",
        JSON.stringify(alunos)

    );

    listarAlunos();
    limparFormulario();
    mostrarTela("lista");

}

function listarAlunos(){

    const busca =
    document.getElementById("busca")?.value
    .toLowerCase() || "";
    const tabela =
    document.getElementById("tabela");
    if(!tabela) return;
    tabela.innerHTML = "";
    alunos
    .filter(aluno =>

        aluno.nome.toLowerCase().includes(busca)
        ||
        aluno.matricula.toLowerCase().includes(busca)

    )

    .forEach((aluno,index)=>{
        tabela.innerHTML += `

        <tr>
        <td>
        <img

        src="${aluno.foto}"
        width="50"
        height="50"
        style="border-radius:50%">

        </td>
        <td>${aluno.nome}</td>
        <td>${aluno.matricula}</td>
        <td>${aluno.idade || "N/A"}</td>
        <td>${aluno.curso || "N/A"}</td>
        <td>${aluno.escola || "N/A"}</td>
        <td>
        <button onclick="editarAluno(${index})">
        ✏️
        </button>
        <button onclick="excluirAluno(${index})">
        🗑️
        </button>
        </td>
        </tr>
        `;
    });
}

function editarAluno(index){

    const aluno = alunos[index];
    aluno.nome = prompt(
        "Nome:",
        aluno.nome

    );

    aluno.matricula = prompt(
        "Matrícula:",
        aluno.matricula

    );

    aluno.idade = prompt(
        "Idade:",
        aluno.idade

    );

    aluno.curso = prompt(
        "Curso:",
        aluno.curso

    );

    aluno.escola = prompt(
        "Escola:",
        aluno.escola

    );

    localStorage.setItem(
        "alunos",
        JSON.stringify(alunos)
    );

    listarAlunos();

}

function excluirAluno(index){

    if(confirm("Deseja excluir este aluno?")){

        alunos.splice(index,1);

        localStorage.setItem(
            "alunos",
            JSON.stringify(alunos)
        );

        listarAlunos();

    }
}

function limparFormulario(){

document.getElementById("nome").value="";
document.getElementById("matricula").value="";
document.getElementById("idade").value="";
document.getElementById("curso").value="";
document.getElementById("escola").value="";
document.getElementById("fotoPerfil").src=

"img/perfil-padrao.png";
}

const uploadFoto =
document.getElementById("uploadFoto");
const fotoPerfil =
document.getElementById("fotoPerfil");

    if(uploadFoto){
        uploadFoto.addEventListener(
        "change",

function(){

    const arquivo = this.files[0];
    if(arquivo){
        const leitor = new FileReader();
        leitor.onload = function(e){
        fotoPerfil.src = e.target.result;

}

leitor.readAsDataURL(arquivo);

}
}
);
}
listarAlunos();
