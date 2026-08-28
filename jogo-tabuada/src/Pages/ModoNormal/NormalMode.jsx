import { useEffect, useState } from "react";
import "./ModoNormal.css";

export default function NormalMode() {

    // =========================
    // ESTADOS
    // =========================

    const [n1, setN1] = useState(1);
    const [n2, setN2] = useState(1);

    const [resposta, setResposta] = useState("");

    const [qtdPerguntas, setQtdPerguntas] = useState(1);
    const [vidas, setVidas] = useState(3);
    const [pontos, setPontos] = useState(0);
    const [tempo, setTempo] = useState(10);

    const [gameOver, setGameOver] = useState(false);
    const [venceu, setVenceu] = useState(false);


    // =========================
    // NOVA PERGUNTA
    // =========================

    function novaPergunta() {

        const novoN1 = Math.floor(Math.random() * 10) + 1;
        const novoN2 = Math.floor(Math.random() * 10) + 1;

        setN1(novoN1);
        setN2(novoN2);

        setResposta("");
        setTempo(10);

        setQtdPerguntas((valor) => valor + 1);
    }


    // =========================
    // PERDER VIDA
    // =========================

    function perderVida() {

        setVidas((vidasAtuais) => {

            const novasVidas = vidasAtuais - 1;

            if (novasVidas <= 0) {

                setGameOver(true);

            } else {

                novaPergunta();

            }

            return novasVidas;
        });
    }


    // =========================
    // VERIFICAR RESPOSTA
    // =========================

    function verificar() {

        if (gameOver || venceu) {
            return;
        }

        const valor = Number(resposta);

        const resultado = n1 * n2;

        // ACERTOU
        if (valor === resultado) {

            const novosPontos = pontos + 1;

            setPontos(novosPontos);

            // Ganhou com 10 pontos
            if (novosPontos >= 10) {

                setVenceu(true);

                return;
            }

            novaPergunta();

        }

        // ERROU
        else {

            perderVida();

        }
    }


    // =========================
    // CRONÔMETRO
    // =========================

    useEffect(() => {

        if (gameOver || venceu) {
            return;
        }

        const intervalo = setInterval(() => {

            setTempo((tempoAtual) => {

                if (tempoAtual <= 1) {

                    perderVida();

                    return 10;
                }

                return tempoAtual - 1;
            });

        }, 1000);


        return () => {
            clearInterval(intervalo);
        };

    }, [gameOver, venceu]);


    // =========================
    // TECLA ENTER
    // =========================

    useEffect(() => {

        function pressionouEnter(e) {

            if (e.key === "Enter") {
                verificar();
            }

        }

        window.addEventListener("keydown", pressionouEnter);

        return () => {
            window.removeEventListener("keydown", pressionouEnter);
        };

    });


    // =========================
    // PRIMEIRA PERGUNTA
    // =========================

    useEffect(() => {

        const novoN1 = Math.floor(Math.random() * 10) + 1;
        const novoN2 = Math.floor(Math.random() * 10) + 1;

        setN1(novoN1);
        setN2(novoN2);

    }, []);


    // =========================
    // JOGAR NOVAMENTE
    // =========================

    function jogarNovamente() {

        setN1(1);
        setN2(1);

        setResposta("");

        setQtdPerguntas(1);
        setVidas(3);
        setPontos(0);
        setTempo(10);

        setGameOver(false);
        setVenceu(false);

        novaPergunta();
    }


    // =========================
    // GAME OVER
    // =========================

    if (gameOver) {

        return (

            <div className="tela">

                <div className="final">

                    <h2>
                        GAME OVER 💀
                    </h2>

                    <p>
                        Pontos: <span>{pontos}</span>
                    </p>

                    <button onClick={jogarNovamente}>
                        Jogar Novamente
                    </button>

                    <br />

                    <button onClick={() => window.location.href = "/"}>
                        Voltar ao Lobby
                    </button>

                </div>

            </div>

        );
    }


    // =========================
    // VITÓRIA
    // =========================

    if (venceu) {

        return (

            <div className="tela">

                <div className="ganhou">

                    <h2 className="p">
                        VOCÊ GANHOU!! 🍭
                    </h2>

                    <p>
                        Pontos: {pontos}
                    </p>

                    <button onClick={jogarNovamente}>
                        Jogar Novamente
                    </button>

                    <br />

                    <button onClick={() => window.location.href = "/"}>
                        Voltar ao Lobby
                    </button>

                </div>

            </div>

        );
    }


    // =========================
    // JOGO
    // =========================

    return (

        <div className="tela">

            <div className="container" id="game">

                <h1>
                    TABUADA
                </h1>


                <div className="pergunta" id="pergunta">

                    {n1} × {n2}

                </div>


                <input
                    type="number"
                    id="resposta"
                    value={resposta}
                    onChange={(e) => setResposta(e.target.value)}
                    autoFocus
                />


                <br />


                <button onClick={verificar}>
                    RESPONDER
                </button>


                <div className="info">

                    {/* VIDAS */}

                    <span>

                        <img
                            src="/MineHeart.png"
                            alt="Vidas"
                        />

                        <p id="vidas">
                            {vidas}
                        </p>

                    </span>


                    {/* PERGUNTAS */}

                    <h2 className="hi">

                        Pergunta:{" "}

                        <span id="p">
                            {qtdPerguntas}
                        </span>

                    </h2>


                    {/* TEMPO */}

                    <span>

                        <img
                            src="/MinecraftCLock-removebg-preview.png"
                            alt="Tempo"
                        />

                        <p id="tempo">
                            {tempo}
                        </p>

                    </span>

                </div>

            </div>

        </div>

    );
}