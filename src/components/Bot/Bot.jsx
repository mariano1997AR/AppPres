import { useState } from 'react';
import rocketAT from '../../assets/Logo-Rocket2.png';
import './Bot.css';


export const Bot = () => {
    const [nombre, setNombre] = useState('');  // Estado para capturar el valor del input
    const [email, setEmail] = useState('');
    const [mensaje, setMensaje] = useState('');

  
    const handleSubmit = async (e) => {
      e.preventDefault(); // Evitar recarga de la página
  
      e.preventDefault();  // Evitar que la página se recargue al enviar el formulario

      // Crear un objeto con los datos del formulario
      const datos = {
          nombre: nombre,
          email: email
      };

      try {
          // Enviar los datos al backend Flask usando fetch
          const response = await fetch('https://servidorrocket01.onrender.com/api/submitdata', {
              method: 'POST',  // El método POST para enviar datos
              headers: {
                  'Content-Type': 'application/json'  // Indicamos que el contenido es JSON
              },
              body: JSON.stringify(datos)  // Convertir los datos del formulario a JSON
          });

          const data = await response.json();  // Convertir la respuesta a JSON
          setMensaje(data.message)
      } catch (error) {
          console.error('Error al enviar datos:', error);
      }
    };
  return (
    <>
        <div className='flex-container'>
           <div className='flex-item-left'>
               <img src={rocketAT} alt="foto del bot" />
           </div>
           <div className='flex-item-right'>
           <h2>Formulario de Contacto</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre:</label>
                    <input
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}  // Actualizar el estado cuando el usuario escribe
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}  // Actualizar el estado cuando el usuario escribe
                    />
                </div>
                <button type="submit">Enviar</button>
                {mensaje && <p>{mensaje}</p>}  {/* Mostrar el mensaje del backend */}
            </form>
            </div>
        </div>
    </>
  )
}
