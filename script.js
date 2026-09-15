
// ==========================================
// PALAVRAS DO MODO ALEATÓRIO
// ==========================================

const palavras = [

    {
        palavra: "COMPUTADOR",
        dica: "Máquina usada para executar programas."
    },

    {
        palavra: "PROGRAMACAO",
        dica: "Processo de criar softwares através de código."
    },

    {
        palavra: "JAVASCRIPT",
        dica: "Linguagem muito utilizada no desenvolvimento web."
    },

    {
        palavra: "PYTHON",
        dica: "Linguagem conhecida por sua sintaxe simples."
    },

    {
        palavra: "CARRO",
        dica: "Veículo utilizado para transportar pessoas."
    },

    {
        palavra: "MOTOCICLETA",
        dica: "Veículo de duas rodas com motor."
    },

    {
        palavra: "AVIAO",
        dica: "Meio de transporte que voa."
    },

    {
        palavra: "DINOSSAURO",
        dica: "Animal pré-histórico que viveu há milhões de anos."
    },

    {
        palavra: "FUTEBOL",
        dica: "Esporte jogado com uma bola e dois gols."
    },

    {
        palavra: "GUITARRA",
        dica: "Instrumento musical de cordas."
    },

    {
        palavra: "ESCOLA",
        dica: "Lugar onde os estudantes aprendem."
    },

    {
        palavra: "INTERNET",
        dica: "Rede mundial que conecta computadores."
    },

    {
        palavra: "CELULAR",
        dica: "Dispositivo usado para comunicação e vários aplicativos."
    },

    {
        palavra: "VIDEOGAME",
        dica: "Dispositivo usado para jogar jogos eletrônicos."
    },

    {
        palavra: "ENGENHARIA",
        dica: "Área que utiliza ciência e matemática para desenvolver soluções."
    }

];


// ==========================================
// VARIÁVEIS
// ==========================================

let palavraAtual = "";

let dicaAtual = "";

let letrasCorretas = [];

let letrasErradas = [];

let erros = 0;

let modoAtual = "";


// ==========================================
// ELEMENTOS
// ==========================================

const menu =
    document.getElementById("menu");

const configAmigo =
    document.getElementById("configAmigo");

const jogo =
    document.getElementById("jogo");

const palavraElemento =
    document.getElementById("palavra");

const dicaElemento =
    document.getElementById("dica");

const errosElemento =
    document.getElementById("erros");

const tecladoElemento =
    document.getElementById("teclado");

const mensagemElemento =
    document.getElementById("mensagem");

const novoJogoElemento =
    document.getElementById("novoJogo");

const letrasCertasElemento =
    document.getElementById("letrasCertas");

const letrasErradasElemento =
    document.getElementById("letrasErradas");


// ==========================================
// ABRIR MODO AMIGO
// ==========================================

function abrirModoAmigo() {

    menu.classList.add("hidden");

    configAmigo.classList.remove("hidden");

}


// ==========================================
// CRIAR DESAFIO
// ==========================================

function criarDesafio() {

    const palavraInput =
        document.getElementById("palavraAmigo").value;

    const dicaInput =
        document.getElementById("dicaAmigo").value;


    if (palavraInput.trim() === "") {

        alert("Digite uma palavra!");

        return;

    }


    if (dicaInput.trim() === "") {

        alert("Digite uma dica!");

        return;

    }


    palavraAtual =
        normalizarPalavra(palavraInput);


    dicaAtual =
        dicaInput.trim();


    modoAtual = "amigo";


    iniciarJogo();

}


// ==========================================
// MODO ALEATÓRIO
// ==========================================

function iniciarModoAleatorio() {

    const indice =
        Math.floor(
            Math.random() * palavras.length
        );


    palavraAtual =
        normalizarPalavra(
            palavras[indice].palavra
        );


    dicaAtual =
        palavras[indice].dica;


    modoAtual = "aleatorio";


    iniciarJogo();

}


// ==========================================
// INICIAR JOGO
// ==========================================

function iniciarJogo() {

    letrasCorretas = [];

    letrasErradas = [];

    erros = 0;


    menu.classList.add("hidden");

    configAmigo.classList.add("hidden");

    jogo.classList.remove("hidden");


    dicaElemento.textContent =
        dicaAtual;


    errosElemento.textContent =
        erros;


    mensagemElemento.textContent =
        "";


    novoJogoElemento.classList.add("hidden");


    criarTeclado();

    atualizarPalavra();

    atualizarForca();

    atualizarLetrasUsadas();

}


// ==========================================
// NORMALIZAR PALAVRA
// ==========================================

function normalizarPalavra(texto) {

    return texto

        .normalize("NFD")

        .replace(/[\u0300-\u036f]/g, "")

        .toUpperCase()

        .replace(/[^A-Z0-9 ]/g, "");

}


// ==========================================
// MOSTRAR PALAVRA
// ==========================================

function atualizarPalavra() {

    let resultado = "";


    for (let letra of palavraAtual) {

        if (letra === " ") {

            resultado += "   ";

        }

        else if (
            letrasCorretas.includes(letra)
        ) {

            resultado += letra + " ";

        }

        else {

            resultado += "_ ";

        }

    }


    palavraElemento.textContent =
        resultado.trim();


    verificarVitoria();

}


// ==========================================
// TECLADO
// ==========================================

function criarTeclado() {

    tecladoElemento.innerHTML = "";


    const letras =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");


    letras.forEach(letra => {

        const botao =
            document.createElement("button");


        botao.textContent =
            letra;


        botao.classList.add("tecla");


        botao.addEventListener(
            "click",
            () => tentarLetra(letra, botao)
        );


        tecladoElemento.appendChild(botao);

    });

}


// ==========================================
// TENTAR LETRA
// ==========================================

function tentarLetra(letra, botao = null) {

    if (
        letrasCorretas.includes(letra) ||
        letrasErradas.includes(letra)
    ) {

        return;

    }


    if (botao) {

        botao.disabled = true;

    }


    // LETRA CERTA
    if (palavraAtual.includes(letra)) {

        letrasCorretas.push(letra);

    }


    // LETRA ERRADA
    else {

        letrasErradas.push(letra);

        erros++;

        errosElemento.textContent =
            erros;

        atualizarForca();

    }


    atualizarLetrasUsadas();

    atualizarPalavra();

    verificarDerrota();

}


// ==========================================
// ATUALIZAR LETRAS USADAS
// ==========================================

function atualizarLetrasUsadas() {

    if (letrasCorretas.length > 0) {

        letrasCertasElemento.textContent =
            letrasCorretas.join(" • ");

    }

    else {

        letrasCertasElemento.textContent =
            "Nenhuma";

    }


    if (letrasErradas.length > 0) {

        letrasErradasElemento.textContent =
            letrasErradas.join(" • ");

    }

    else {

        letrasErradasElemento.textContent =
            "Nenhuma";

    }

}


// ==========================================
// TECLADO FÍSICO
// ==========================================

document.addEventListener(
    "keydown",
    function(event) {

        if (
            jogo.classList.contains("hidden")
        ) {

            return;

        }


        const letra =
            event.key.toUpperCase();


        if (
            /^[A-Z]$/.test(letra)
        ) {

            const botoes =
                document.querySelectorAll(".tecla");


            botoes.forEach(botao => {

                if (
                    botao.textContent === letra &&
                    !botao.disabled
                ) {

                    tentarLetra(
                        letra,
                        botao
                    );

                }

            });

        }

    }
);


// ==========================================
// ATUALIZAR BONECO
// ==========================================

function atualizarForca() {

    const partes = [

        "cabeca",

        "corpo",

        "bracoEsquerdo",

        "bracoDireito",

        "pernaEsquerda",

        "pernaDireita"

    ];


    partes.forEach(
        (parte, index) => {

            const elemento =
                document.getElementById(parte);


            if (index < erros) {

                elemento.style.display =
                    "block";

            }

            else {

                elemento.style.display =
                    "none";

            }

        }
    );

}


// ==========================================
// VITÓRIA
// ==========================================

function verificarVitoria() {

    const letrasDaPalavra =
        [
            ...new Set(
                palavraAtual
                    .replace(/ /g, "")
                    .split("")
            )
        ];


    const ganhou =
        letrasDaPalavra.every(
            letra =>
                letrasCorretas.includes(letra)
        );


    if (
        ganhou &&
        palavraAtual !== ""
    ) {

        mensagemElemento.textContent =
            "🎉 PARABÉNS! Você acertou!";


        mensagemElemento.style.color =
            "#22c55e";


        bloquearTeclado();


        novoJogoElemento.classList.remove(
            "hidden"
        );

    }

}


// ==========================================
// DERROTA
// ==========================================

function verificarDerrota() {

    if (erros >= 6) {

        mensagemElemento.innerHTML =
            `💀 Você perdeu! A palavra era: <strong>${palavraAtual}</strong>`;


        mensagemElemento.style.color =
            "#ef4444";


        bloquearTeclado();


        novoJogoElemento.classList.remove(
            "hidden"
        );

    }

}


// ==========================================
// BLOQUEAR TECLADO
// ==========================================

function bloquearTeclado() {

    const botoes =
        document.querySelectorAll(".tecla");


    botoes.forEach(botao => {

        botao.disabled = true;

    });

}


// ==========================================
// REINICIAR
// ==========================================

function reiniciarJogo() {

    if (modoAtual === "aleatorio") {

        iniciarModoAleatorio();

    }

    else {

        iniciarJogo();

    }

}


// ==========================================
// VOLTAR AO MENU
// ==========================================

function voltarMenu() {

    menu.classList.remove("hidden");

    configAmigo.classList.add("hidden");

    jogo.classList.add("hidden");

    mensagemElemento.textContent = "";

}


// ==========================================
// ENTER NOS CAMPOS
// ==========================================

document
    .getElementById("palavraAmigo")
    .addEventListener(
        "keydown",
        function(event) {

            if (event.key === "Enter") {

                document
                    .getElementById("dicaAmigo")
                    .focus();

            }

        }
    );


document
    .getElementById("dicaAmigo")
    .addEventListener(
        "keydown",
        function(event) {

            if (event.key === "Enter") {

                criarDesafio();

            }

        }
    );
