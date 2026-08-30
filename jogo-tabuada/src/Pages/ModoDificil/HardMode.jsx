import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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

    function gerarPergunta() {

        const novoN1 = Math.floor(Math.random() * 10) + 1;
        const novoN2 = Math.floor(Math.random() * 10) + 1;

        setN1(novoN1);
        setN2(novoN2);

        setResposta("");
        setTempo(5);
    }

    function novaPergunta() {

        gerarPergunta();

        setQtdPerguntas((valor) => valor + 1);
    }

    function perderVida() {

        setVidas(0);
        setGameOver(true);
    }

    function verificar() {

        if (gameOver || venceu) {
            return;
        }

        const valor = Number(resposta);
        const resultado = n1 * n2;

        if (valor === resultado) {

            const novosPontos = pontos + 1;

            setPontos(novosPontos);

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

            setTempo((valor) => valor - 1);

        }, 1000);

        return () => {
            clearInterval(intervalo);
        };

    }, [gameOver, venceu]);

    useEffect(() => {

        if (tempo <= 0 && !gameOver && !venceu) {

            perderVida();

        }

    }, [tempo, gameOver, venceu]);

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

    }, [resposta, n1, n2, pontos, gameOver, venceu]);

    useEffect(() => {

        gerarPergunta();

    }, []);

    function jogarNovamente() {

        const novoN1 = Math.floor(Math.random() * 10) + 1;
        const novoN2 = Math.floor(Math.random() * 10) + 1;

        setN1(novoN1);
        setN2(novoN2);

        setResposta("");

        setVidas(1);
        setPontos(0);
        setTempo(5);
        setQtdPerguntas(1);

        setGameOver(false);
        setVenceu(false);
    }

    if (gameOver) {

        return (

            <div
                className="tela"
                style={{
                    backgroundImage: `url(${process.env.PUBLIC_URL}/Fundo.png)`
                }}
            >

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

                    <Link to="/">
                        <button>
                            Voltar ao Lobby
                        </button>
                    </Link>

                </div>

            </div>

        );
    }

    if (venceu) {

        return (

            <div
                className="tela"
                style={{
                    backgroundImage: `url(${process.env.PUBLIC_URL}/Fundo.png)`
                }}
            >

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

                    <Link to="/">
                        <button>
                            Voltar ao Lobby
                        </button>
                    </Link>

                </div>

            </div>

        );
    }

    return (

        <div
            className="tela"
            style={{
                backgroundImage: `url(${process.env.PUBLIC_URL}/Fundo.png)`
            }}
        >

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
                            src={`${process.env.PUBLIC_URL}/Assets/Imgs/HardcoreHeart-removebg-preview.png`}
                            alt="Vida"
                        />

                        <p>
                            {vidas}
                        </p>

                    </span>


                    <h2 className="hi">

                        Pergunta:{" "}

                        <span>
                            {qtdPerguntas}
                        </span>

                    </h2>


                    <span>

                        <img
                            src={`${process.env.PUBLIC_URL}/Assets/Imgs/MinecraftCLock-removebg-preview.png`}
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