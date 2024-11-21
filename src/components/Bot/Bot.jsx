import { useState } from 'react';
import rocketAT from '../../assets/Logo-Rocket2.png';
import './Bot.css';


export const Bot = () => {
    const [mensaje, setMensaje] = useState('');
    const [respuesta, setRespuesta] = useState(null);
  
    const handleSubmit = async (e) => {
      e.preventDefault(); // Evitar recarga de la página
  
      try {
        // Enviar datos al backend
        const response = await fetch('http://127.0.0.1:10000/api/submitdata', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ accion: mensaje }),
        });
  
        if (!response.ok) {
          throw new Error('Error en la respuesta del servidor.');
        }
  
        if (mensaje === 'crear') {
          // Descargar el archivo PDF
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'documento.pdf'); // Nombre del archivo
          document.body.appendChild(link);
          link.click();
          link.parentNode.removeChild(link);
        } else {
          // Mostrar el mensaje recibido
          const data = await response.json();
          setRespuesta(data.mensaje); // Mostrar el mensaje en pantalla
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
  return (
    <>
        <div className='flex-container'>
           <div className='flex-item-left'>
               <img src={rocketAT} alt="foto del bot" />
           </div>
           <div className='flex-item-right'>
              <p>
                <h3>Instrucciones</h3>
                <ol>
                   <li>Saludar</li>
                   <li>Crear un documento</li>
                   <li>Crear un ticket</li>
                 </ol>
              </p>
              <form onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            style={{ margin: '10px', padding: '5px', width: '100%' }}
            required
          />
        </label>
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Enviar
        </button>
      </form>
      {respuesta && (
        <div style={{ marginTop: '20px', color: 'green' }}>
          <strong>Respuesta:</strong> {respuesta}
        </div>
      )}
            </div>
        </div>
    </>
  )
}
