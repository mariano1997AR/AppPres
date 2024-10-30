import { Link } from 'react-router-dom';
import './ObtenerApp.css';

export const ObtenerApp = () => {
    return (
        <>

            <nav className='navbar fixed-top navbar-expand-lg navbar-dark p-md-3'>
                <div className='container'>
                    <a href='#' className='navbar-brand'>AppPres</a>
                    <button
                        type='button'
                        className='navbar-toggler'
                        data-bs-target='#navbarNav'
                        data-bs-toggle='collapse'
                        aria-controls='navbarNav'
                        aria-expanded='false'
                        aria-label='Toggle Navbar'

                    >
                        <span className='navbar-toggler-icon'></span>
                    </button>
                    <div className='collapse navbar-collapse' id='navbarNav'>
                        <ul className='navbar-nav'>
                            <li className='nav-item'><Link to='/' className='nav-link text-white'>Home</Link></li>
                        </ul>
                        <ul className='navbar-nav'>
                            <li className='nav-item'><Link to='/obtenerApp' className='nav-link text-white'>Obtener App</Link></li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* banner image */}
            <div className='banner-image w-100 vh-100 d-flex justify-content-center align-items-center'>
                <div className='content text-center'>
                    <div className="card img-fluid" style={{width:'500px'}}>
                      
                            <div className="card-img-overlay card-personalizada">
                                <h4 className="card-title">Contactame</h4>
                                <p className="card-text">Para obtener el software haz click al boton 
                                    y obtener el codigo de verificacion para entrar al sistema de AppPres
                                </p>
                                <a className='btn-envio' href="https://api.whatsapp.com/send?phone=541133550437&text=Hola%20gracias%20por%20comunicarte%20con%20ApoloIX.%20¿Cual%20es%20tu%20consulta? ">Haz click Aqui</a>
                            </div>
                    </div>


                </div>
            </div>



        </>
    )
}


