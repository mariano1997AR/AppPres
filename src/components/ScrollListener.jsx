import React, { useEffect } from 'react';

export const ScrollListener = ({boxRef}) => {
  // Función que se llamará cuando se produzca el evento de desplazamiento
  const handleScroll = () => {

    if (window.scrollY > 100){
         if(boxRef.current){
             boxRef.current.classList.add('bg-dark','shadow');
         }else{
             boxRef.current.classList.remove('bg-dark','shadow');
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
  }, []); // El array vacío asegura que esto solo se ejecute una vez al montar el componente

  return (
    <div>
      
    </div>
  );
};
