
let n1;
let n2;
let resultado;

let vidas = 1;
let pontos = 0;
let tempo = 5;
let qtdPerguntas = 1;

const pergunta = document.getElementById("pergunta");
const respostaInput = document.getElementById("resposta");

function novaPergunta(){

    n1 = Math.floor(Math.random() * 10) + 1;
    n2 = Math.floor(Math.random() * 10) + 1;

    resultado = n1 * n2;

    pergunta.innerHTML = `${n1} × ${n2}`;

    respostaInput.value = "";

    tempo = 5;
    document.getElementById("tempo").innerHTML = tempo;
    document.getElementById("p").innerHTML = qtdPerguntas;
    qtdPerguntas++;
}

function verificar(){

    let valor = Number(respostaInput.value);

    if(valor === resultado){

        pontos++;

        novaPergunta();

    }else{

        perderVida();
    }

     if(pontos >= 20){
        tempo = 80000;

        document.getElementById("game").style.display = "none";

        document.getElementById("win").style.display = "flex";

        document.getElementById("wins").innerText = `Pontos: ${pontos}`
    }
}

function perderVida(){

    vidas--;

    document.getElementById("vidas").innerHTML = vidas;

    if(vidas <= 0){

        gameOver();

    }else{

        novaPergunta();
    }
}

function gameOver(){

    document.getElementById("game").style.display = "none";

    let final = document.getElementById("final");

    final.style.display = "block";

    document.getElementById("pontos").innerHTML = pontos;
}

setInterval(()=>{

    tempo--;

    document.getElementById("tempo").innerHTML = tempo;

    if(tempo <= 0){

        perderVida();
    }

},1000);

window.addEventListener("keydown",(e)=>{

    if(e.key === "Enter"){

        verificar();
    }

});

novaPergunta();