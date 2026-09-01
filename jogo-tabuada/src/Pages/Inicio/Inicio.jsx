import { Link } from "react-router-dom";
import "./Inicio.css";

export default function Home() {
    return (
        <div className="tela">
            <section className="game">

                <img
                    src={`${process.env.PUBLIC_URL}/Assets/Imgs/tittle.png`}
                    alt="Desafio da Tabuada"
                    className="Start"
                />

                <Link to="/normal" className="botao">
                    NORMAL MODE
                </Link>

                <Link to="/hard" className="botao">
                    HARD MODE
                </Link>

                <a
                    href="https://www.google.com/"
                    className="botao"
                >
                    EXIT
                </a>

            </section>

            <nav className="config">
                <img src={`${process.env.PUBLIC_URL}/Assets/Imgs/Configurações.png`} alt="Configurações" />
            </nav>
        </div>
    );
}