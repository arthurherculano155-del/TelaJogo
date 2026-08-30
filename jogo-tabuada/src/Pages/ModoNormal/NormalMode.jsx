import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NormalMode.css";

export default function NormalMode() {

    const navigate = useNavigate();

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
    // GERAR PERGUNTA
    // =========================

    function gerarPergunta() {

        const novoN1 = Math.floor(Math.random() * 10) + 1;
        const novoN2 = Math.floor(Math.random() * 10) + 1;

        setN1(novoN1);
        setN2(novoN2);

        setResposta("");
        setTempo(10);
    }

    function novaPergunta() {

        gerarPergunta();

        setQtdPerguntas((valor) => valor + 1);
    }

    function perderVida() {

        if (vidas === 1) {

            setVidas(0);
            setGameOver(true);

            return;
        }

        setVidas((valor) => valor - 1);

        novaPergunta();
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

            if (novosPontos >= 10) {

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

        if (tempo !== 0) {
            return;
        }

        if (gameOver || venceu) {
            return;
        }

        if (vidas === 1) {

            setVidas(0);
            setGameOver(true);

            return;
        }

        setVidas((valor) => valor - 1);

        novaPergunta();

    }, [tempo, vidas, gameOver, venceu]);

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

    }, [resposta, n1, n2, gameOver, venceu]);

    useEffect(() => {

        gerarPergunta();

    }, []);

    function jogarNovamente() {

        const novoN1 = Math.floor(Math.random() * 10) + 1;
        const novoN2 = Math.floor(Math.random() * 10) + 1;

        setN1(novoN1);
        setN2(novoN2);

        setResposta("");

        setQtdPerguntas(1);
        setVidas(3);
        setPontos(0);
        setTempo(10);

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

                    <button onClick={() => navigate("/")}>
                        Voltar ao Lobby
                    </button>

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
                        VOCÊ GANHOU!! 🍭
                    </h2>

                    <p>
                        Pontos: {pontos}
                    </p>

                    <button onClick={jogarNovamente}>
                        Jogar Novamente
                    </button>

                    <button onClick={() => navigate("/")}>
                        Voltar ao Lobby
                    </button>

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

                    <span>

                        <img
                            src={`${process.env.PUBLIC_URL}/Assets/Imgs/MineHeart.png`}
                            alt="Vidas"
                        />

                        <p id="vidas">
                            {vidas}
                        </p>

                    </span>


                    <h2 className="hi">

                        Pergunta:{" "}

                        <span id="p">
                            {qtdPerguntas}
                        </span>

                    </h2>


                    <span>

                        <img
                            src={`${process.env.PUBLIC_URL}/Assets/Imgs/MinecraftCLock-removebg-preview.png`}
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