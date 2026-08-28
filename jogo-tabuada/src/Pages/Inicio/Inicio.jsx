import { Link } from "react-router-dom";
import "./index.css";

export default function Home() {
    return (
        <div className="tela">

            <section className="game">

                <img
                    src="/tittle.png"
                    alt="Desafio da Tabuada"
                    className="Start"
                />

                <Link to="/normal">
                    <button>
                        <strong>
                            <p>NORMAL MODE</p>
                        </strong>
                    </button>
                </Link>

                <Link to="/hard">
                    <button>
                        <strong>
                            <p>HARD MODE</p>
                        </strong>
                    </button>
                </Link>

                <a href="https://www.google.com/">
                    <button>
                        <strong>
                            <p>EXIT</p>
                        </strong>
                    </button>
                </a>

            </section>

        </div>
    );
}