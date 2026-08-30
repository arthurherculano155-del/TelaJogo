import { useEffect, useState } from "react";
import "./HardMode.css";

export default function HardMode() {

    const [n1, setN1] = useState(1);
    const [n2, setN2] = useState(1);

    const [resposta, setResposta] = useState("");

    const [vidas, setVidas] = useState(1);
    const [pontos, setPontos] = useState(0);
    const [tempo, setTempo] = useState(5);
    const [qtdPerguntas, setQtdPerguntas] = useState(1);

    const [gameOver, setGameOver] = useState(false);
    const [venceu, setVenceu] = useState(false);

    function novaPergunta() {

        const novoN1 = Math.floor(Math.random() * 10) + 1;
        const novoN2 = Math.floor(Math.random() * 10) + 1;

        setN1(novoN1);
        setN2(novoN2);

        setResposta("");

        setTempo(5);

        setQtdPerguntas((valor) => valor + 1);
    }

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

    function verificar() {

        const valor = Number(resposta);

        const resultado = n1 * n2;

        if (valor === resultado) {

            const novosPontos = pontos + 1;

            setPontos(novosPontos);

            // Vitória com 20 pontos
            if (novosPontos >= 20) {
                setVenceu(true);
                return;
            }

            novaPergunta();

        } else {

            perderVida();

        }
    }

    useEffect(() => {

        if (gameOver || venceu) {
            return;
        }

        const intervalo = setInterval(() => {

            setTempo((tempoAtual) => {

                if (tempoAtual <= 1) {

                    perderVida();

                    return 5;
                }

                return tempoAtual - 1;

            });

        }, 1000);


        return () => {
            clearInterval(intervalo);
        };

    }, [gameOver, venceu]);

    useEffect(() => {

        function pressionouTecla(e) {

            if (e.key === "Enter") {
                verificar();
            }

        }

        window.addEventListener("keydown", pressionouTecla);

        return () => {
            window.removeEventListener("keydown", pressionouTecla);
        };

    });

    useEffect(() => {

        const novoN1 = Math.floor(Math.random() * 10) + 1;
        const novoN2 = Math.floor(Math.random() * 10) + 1;

        setN1(novoN1);
        setN2(novoN2);

    }, []);

    function jogarNovamente() {

        setN1(1);
        setN2(1);

        setResposta("");

        setVidas(1);
        setPontos(0);
        setTempo(5);
        setQtdPerguntas(1);

        setGameOver(false);
        setVenceu(false);

        novaPergunta();
    }

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

    if (venceu) {

        return (

            <div className="tela">

                <div className="ganhou">

                    <h2 className="p">
                        VOCÊ GANHOU!! 🍿
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

    return (

        <div className="tela">

            <div className="container" id="game">

                <h1>
                    TABUADA
                </h1>


                <div className="pergunta">
                    {n1} × {n2}
                </div>


                <input
                    type="number"
                    value={resposta}
                    onChange={(e) => setResposta(e.target.value)}
                    autoFocus
                />


                <br />


                <button onClick={verificar}>
                    RESPONDER
                </button>


                <div className="info">

                    <span>

                        <img
                            src="/Assets/Imgs/HardcoreHeart-removebg-preview.png"
                            alt="Vida"
                        />

                        <p>
                            {vidas}
                        </p>

                    </span>


                    <h2 className="hi">
                        Pergunta: <span>{qtdPerguntas}</span>
                    </h2>


                    <span>

                        <img
                            src="/Assets/Imgs/MinecraftCLock-removebg-preview.png"
                            alt="Tempo"
                        />

                        <p>
                            {tempo}
                        </p>

                    </span>

                </div>

            </div>

        </div>

    );
}