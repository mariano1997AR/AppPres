import { useAuth } from '../../hooks/useAuth.js'
import { GeneratorPdf } from '../../components/GeneratorPDF/GeneradorPdf.jsx';
import { Bot } from '../Bot/Bot.jsx';

export const Dashboard = () => {
    const { logout} = useAuth();


    return (
        <>
            <div className="container mt-3">
                <h2>SmartContractApp</h2>
                <br />
                <ul className="nav nav-pills" role="tablist">
                    <li className="nav-item">
                        <a className="nav-link active" data-bs-toggle="pill" href="#home">Home</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-bs-toggle="pill" href="#menu1">Proxima calculadora...</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-bs-toggle="pill" href="#menu2">Rocket01-BETA</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-bs-toggle="pill" href="#menu3">Cerrar Sesion</a>
                    </li>
                </ul>
                <div className="tab-content">
                    <div id="home" className="container tab-pane active"><br />
                        <GeneratorPdf></GeneratorPdf>
                    </div>
                    <div id="menu1" className="container tab-pane fade"><br />
                        <h3>En construccion....</h3>
                    </div>
                    <div id="menu2" className="container tab-pane fade"><br />
                        <Bot></Bot>
                    </div>
                    
                    <div id="menu3" className="container tab-pane fade"><br />
                        <h3>Cerrar sesión</h3>
                        <button type='button' className="btn btn-outline-secondary" onClick={logout}>Cerrar sesion</button>
                    </div>
                </div>
            </div>
        </>
    )
}

