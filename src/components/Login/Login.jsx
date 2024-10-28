import { useState, useRef, useEffect } from 'react'
import { useAuth } from '../../hooks/useAuth.js'
import { Loader } from '../Loader.jsx';
import './Login.css';
import { Link } from 'react-router-dom';


export const Login = () => {
    const { loading, login} = useAuth();
    const boxRef = useRef(null);
    const [code, setCode] = useState('');


    const handleScroll = () => {
        if (boxRef.current) {
            if ((window.scrollY > 100)) {
                boxRef.current.classList.add('bg-dark', 'shadow'); // Añadir la clase 'active'

            } else {
                boxRef.current.classList.remove('bg-dark', 'shadow');
            }
        }
    };

    useEffect(() => {
        // Agregar el listener al evento de scroll
        window.addEventListener('scroll', handleScroll);

        // Limpiar el listener al desmontar el componente
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []); // E



    const handleLogin = () => {
        login(code);

    };


    if (loading) {
        return <Loader></Loader>;
    }


    return (
        <>

            <nav className='navbar fixed-top navbar-expand-lg navbar-dark p-md-3' ref={boxRef}>
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
                            <li className='nav-item'><Link to='/obtenerApp' className='nav-link text-white links'>Home</Link></li>
                        </ul>
                        <ul className='navbar-nav'>
                            <li className='nav-item'><Link to='/obtenerApp' className='nav-link text-white links'>Obtener App</Link></li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* banner image */}
            <div className='banner-image w-100 vh-100 d-flex justify-content-center align-items-center'>
                <div className='flex-contenedor'>
                    <div className='flex-left'>
                        <section>
                            <article>
                                <h1>Sobre AppPres</h1>
                                <p>
                                    Se trata de una aplicacion para olvidarse de estar creando
                                    presupuestos con archivo word o pasarlo a pdf. Ya es cosa del pasado y
                                    podes realizar todos los requerimientos en input y se descargar una vez
                                    enviado la informacion.  Para obtener mas informacion Has click en <Link to='/obtenerApp' className='nav-link text-white'><b>Obtener App</b></Link>
                                </p>
                            </article>
                        </section>
                    </div>
                    <div className='flex-right'>
                        <label className='label-cod'>Codigo del programa</label>
                        <input
                            type="text"
                            placeholder='Ingresa el codigo del programa'
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                        />
                        <button className='button button1' onClick={handleLogin}>Ingresar</button>
                    </div>

                </div>
            </div>

            {/* Area de contenido principal */}
            <main className='container my-5 d-grid gap-5'>
                <section className='p-5 border'>
                    <article>
                        <h2 className='text-center'>Mas información sobre AppPres</h2>
                        <p>AppPres se trata de una aplicación para crear documentos para emprendedores y trabajadores independientes que quieran realizar presupuestos para clientes y trabajos especificados en el formulario de entrada de la aplicación. La aplicacion esta en su versión
                            0.0.1 de desarrollo.
                        </p>
                    </article>
                </section>
            </main>




        </>
    )
}

