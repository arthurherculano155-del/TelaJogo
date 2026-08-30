import './notfound.css';
import { Link } from 'react-router-dom';

export default function NotFound(){
    return(
        <div className="not-found">
            <h1>Modo de Jogo Nao Encontrado</h1>
            <Link to='/'>
                <p>Voltar ao Lobby</p>
            </Link>
        </div>
    );
}