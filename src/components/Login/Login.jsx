import { useState, useRef, useEffect } from 'react'
import { useAuth } from '../../hooks/useAuth.js'
import { Loader } from '../Loader.jsx';
import './Login.css';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faWrench,faFileArrowDown,faBrain} from '@fortawesome/free-solid-svg-icons';
import CardGroup from 'react-bootstrap/CardGroup';

export const Login = () => {
    const { loading, login} = useAuth();
    const boxRef = useRef(null);
    const [code, setCode] = useState('');
    const [currentDate, setCurrentDate] = useState(new Date());


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
           // Función para actualizar la fecha
           const updateDate = () => {
            setCurrentDate(new Date());
          };
          // Configura el intervalo de actualización cada minuto
           const intervalId = setInterval(updateDate, 60000);

        // Llama a updateDate() inmediatamente para mostrar la hora sin esperar un minuto
          updateDate();


        // Limpiar el listener al desmontar el componente
        return () => {
            clearInterval(intervalId);
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
                    <a href='#' className='navbar-brand'>SmartContractApp</a>
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
                            <li className='nav-item'><Link to='/' className='nav-link text-white links'>Home</Link></li>
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
                                <h1>Sobre SmartContract</h1>
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
                <section className="section-contenido-presentacion">
                    <article className="contenido-especificacion-tecnica">
                        <div className="contenido">
                            <span className="flex-item-left">
                                <h2>Especificaciones tecnicas:</h2>
                                <CardGroup>
                                    <Card>
                                       <FontAwesomeIcon className="icons" icon={faWrench} />
                                        <Card.Body>
                                            <Card.Title>Soporte Tecnico</Card.Title>
                                            <Card.Text>
                                                Esta aplicacion tiene soporte tecnico, donde se realiza actualizaciones cada semana
                                                para que la aplicacion no presente fallos u errores durante el despliegue.
                                            </Card.Text>
                                        </Card.Body>
                                        <Card.Footer>
                                            <small className="text-muted">Last updated {currentDate.getMinutes()} mins ago</small>
                                        </Card.Footer>
                                    </Card>
                                    <Card>
                                        <FontAwesomeIcon className="icons" icon={faFileArrowDown} />
                                        <Card.Body>
                                            <Card.Title>Sistema de descarga de archivos </Card.Title>
                                            <Card.Text>
                                               Despues de llenar sus datos en los formularios correspondiente se realiza una descarga automatica sin 
                                               necesidad de realizar ningun otro aplicativo.
                                            </Card.Text>
                                        </Card.Body>
                                        <Card.Footer>
                                            <small className="text-muted">Last updated {currentDate.getMinutes()} mins ago</small>
                                        </Card.Footer>
                                    </Card>
                                    <Card>
                                        <FontAwesomeIcon className="icons" icon={faBrain} />
                                        <Card.Body>
                                            <Card.Title>Sistema de Red Neuronal - IA</Card.Title>
                                            <Card.Text>
                                                  Proximamente voy a integrar una red neuronal de solo 100 neuronas para que pueda
                                                  mejorar el razonamiento por medio de un sistema que clasifique archivos.
                                            </Card.Text>
                                        </Card.Body>
                                        <Card.Footer>
                                            <small className="text-muted">Last updated {currentDate.getMinutes()} mins ago</small>
                                        </Card.Footer>
                                    </Card>
                                </CardGroup>
                            </span>

                        </div>
                    </article>
                </section>
                <section className="contenido-animado">
                     <article>
                         <h3 id='about' className={{'textAlign':'center'}}>Sobre nosotros</h3>
                         <p>
                         Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem ratione quia sapiente, optio earum libero sit totam ea, quaerat, perferendis adipisci dicta ducimus deserunt quisquam velit suscipit saepe beatae molestias.
                         Quas non cupiditate, repellat officiis illum consequuntur, ullam et vitae distinctio nemo ut ex? Labore maiores quaerat laudantium quia alias praesentium ullam, illo esse suscipit ex aliquid placeat, ut nostrum.
                         Officia, nemo quaerat similique minus corporis doloremque natus maiores possimus exercitationem, earum itaque inventore voluptate accusamus, quisquam nulla facilis necessitatibus suscipit enim rem perspiciatis nam. Veniam fugiat exercitationem maxime voluptate?
                         Facere porro, itaque necessitatibus in expedita a cum facilis sapiente temporibus nam. Repudiandae, veritatis officia quasi rem dolorum cumque commodi laudantium unde nam distinctio, fugiat nobis ipsam qui assumenda? Magnam?

                         </p>
                     </article>
                </section>
            </main>

           
          


        </>
    )
}


