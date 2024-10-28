import React, { useState } from 'react'
import { jsPDF } from 'jspdf';
import Form from 'react-bootstrap/Form';

export const GeneratorPdf = () => {
  const [base64Image, setBase64Image] = useState('');
  const [errors, setError] = useState({});
  const [formData, setFormData] = useState({
    nomDoc: '',
    nom_empresa: '',
    responsabilidadSocial: '',
    cuil: '',
    email: '',
    subtitulo_empresa: '',
    servicios: '',
    linkSitioWeb: '',
    direccion: '',
    diagnostico: '',
    tareasRealizar: '',
    materialesRealizar: '',
    valorManoObra:'',
    valorMateriales: '',
    firma:''


  });

  // Datos dinámicos para el select
  const [optionsProfesion, setOptionsProfesion] = useState([
    { value: 'Pintura de edificios y particulares', label: 'Pintura' },
    { value: 'Mantenimiento de edificios y particulares', label: 'Mantenimiento' },
    { value: 'Albañileria en interiores e exteriores', label: 'Albañileria' },
  ]);

  const [selectedOptionProfesion, setSelectedOptionProfesion] = useState('');

  const handleSelectChange = (e) => {
    setSelectedOptionProfesion(e.target.value);
  };

  //estado para almacenar el array de lita



  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBase64Image(reader.result); // Asigna el resultado (base64) al estado
      };
      reader.readAsDataURL(file); // Convierte la imagen a base64
    }
  };

  //Manejar el cambio en cada campo del formulario
  const HandleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  const validate = () => {
    const newErrors = {};
    if (!formData.nomDoc.trim()) {
      newErrors.nomDoc = 'EL nombre del documento no puede estar vacio';
    } else if (!formData.nom_empresa.trim()) {
      newErrors.nom_empresa = 'EL nombre de la empresa no puede estar vacio';
    } else if (!formData.responsabilidadSocial.trim()) {
      newErrors.responsabilidadSocial = 'La responsabilidad social no puede estar vacia';
    } else if (!formData.cuil.trim()) {
      newErrors.cuil = 'El campo cuil no puede estar vacio';
    } else if (!formData.email.trim()) {
      newErrors.email = 'El campo email no puede estar vacio';
    } else if (!formData.servicios.trim()) {
      newErrors.servicios = "EL campo servicio no puede estar vacio";
    } else if (!formData.direccion.trim()) {
      newErrors.direccion = "El campo de direccion no puede estar vacio";
    } else if (!formData.diagnostico.trim()) {
      newErrors.diagnostico = 'El campo de diagnostico no puede estar vacio';
    } else if (!formData.tareasRealizar.trim()) {
      newErrors.tareasRealizar = 'El campo de tareas a reañozar no puede estar vacio';
    } else if(!formData.materialesRealizar.trim()){
      newErrors.materialesRealizar = 'El campo de materiales a realizar no puede estar vacio';
    }else if (!formData.valorManoObra.trim()){
      newErrors.valorManoObra = 'El campo de mano de obra no puede estar vacio';
    }else if(!formData.valorMateriales.trim()){
      newErrors.valorMateriales = 'El campo de valor de materiales no puede estar vacio';
    }else if(!formData.firma.trim()){
      newErrors.firma = 'El campo firma no puede estar vacio';
    }

    return newErrors;
  }

  //validar el formulario y enviar
  const handleSubmit = (e) => {
    e.preventDefault();
    const validateErrors = validate();
    if (Object.keys(validateErrors).length > 0) {
      setError(validateErrors);
    } else {
      setError({});

      //divide el contenido del textarea en lineas y elimina lineas vacias
      const newDataArray = formData.servicios.split('\n').filter(line => line.trim() !== '');
      const datosTareas = formData.tareasRealizar.split('\n').filter(line => line.trim() !== '');
      const datosMateriales = formData.materialesRealizar.split('\n').filter(line => line.trim() !== '');
      generatePDF(newDataArray, datosTareas,datosMateriales);
      e.preventDefault(false);

    }

  }




  const generatePDF = (datosServicios, datosTareas,datosMateriales) => {
    const doc = new jsPDF();
    const imgData = base64Image;


    //titulo
    let tituloPDF = formData.nomDoc;
    // x =10 y y =10

    //presentacion
    const lista =
    {
      nombre: formData.nom_empresa,
      responsabilidadSocial: formData.responsabilidadSocial,
      cuil: formData.cuil,
      email: formData.email
    };

    let yPosListaPresentacion = 30;
    let xPosListaPresentacion = 70;

    //cargar logo
    doc.addImage(imgData, 'JPG', 2, 5, 50, 50);

    //procesar el json de la presentacion
    Object.entries(lista).forEach(([key, value]) => {
      doc.setFontSize(13);
      doc.text(`${key.toUpperCase()}: ${value.toUpperCase()}`, xPosListaPresentacion, yPosListaPresentacion);
      yPosListaPresentacion += 5;
    });

    //Subtitulo -> colocar nuestros servicios
    let tamanioSubtitulo = 17;
    let posSubtituloX = 2;
    let posSubtituloY = yPosListaPresentacion + 10;
    let subtitulo = `Nuestros servicios de ${selectedOptionProfesion}`;
    doc.setFont('Helvetica', "bold");
    doc.setFontSize(tamanioSubtitulo);
    doc.text(subtitulo, posSubtituloX, posSubtituloY);

    //SERVICIOS
    let posServiciosX = 2;
    let posServiciosY = posSubtituloY + 7;
    datosServicios.map((dato) => {
      doc.setFont('Helvetica', "normal");
      doc.setFontSize(12);
      doc.text(`${dato.toUpperCase()}`, posServiciosX, posServiciosY);
      posServiciosY += 5;
    });

    //agregar un enlace
    let xPosLink = 75;
    let yPosLink = posServiciosY + 5;
    let xPosTituloLink = 2;
    let yPosTituloLink = posServiciosY + 5;

    doc.setFont('Helvetica', "bold");
    doc.setFontSize(12);


    doc.text('Visitenos en nuestra pagina: '.toUpperCase(), xPosTituloLink, yPosTituloLink);
    doc.textWithLink(formData.linkSitioWeb, xPosLink, yPosLink, { url: formData.linkSitioWeb });


    //direccion del lugar
    let direccion = formData.direccion;
    // Obtener la fecha de hoy
    const hoy = new Date();
    // Formatear la fecha como cadena
    const formattedDate = hoy.toLocaleDateString(); // Muestra la fecha en formato local
    let fecha = formattedDate;

    doc.setFont('Helvetica', "bold");
    doc.setFontSize(13);
    let xDireccionPos = 2;
    let yDireccionPos = yPosLink + 5;
    let xFechaPos = 2;
    let yFechaPos = yPosLink + 10;
    doc.text(direccion, xDireccionPos, yDireccionPos);
    doc.text(fecha, xFechaPos, yFechaPos);


    //Diagnostico
    let tituloDiagnostico = "Diagnostico: ".toUpperCase();
    let xPosTituloDiag = 2;
    let yPosTituloDiag = yFechaPos + 7;
    doc.text(tituloDiagnostico, xPosTituloDiag, yPosTituloDiag);

    let diagnostico = formData.diagnostico;
    let datos = [];
    let xPostDiag = 2;
    let yposDiag = yPosTituloDiag + 7;
    datos.push(diagnostico);
    datos.map(dato => {
      doc.setFont('Helvetica', "normal");
      doc.setFontSize(12);
      doc.text(`${dato.toUpperCase()}`, xPostDiag, yposDiag);
      posServiciosY += 5;
    });

    //tareas por realizar
    let tituloTareas = 'Tareas por Realizar'.toUpperCase();
    let xPosTituloTareas = 2;
    let yPostTituloTareas = yposDiag + 6;
    doc.setFont('Helvetica', 'bold');
    doc.text(tituloTareas, xPosTituloTareas, yPostTituloTareas);

    //especificacion de tareas
    let xPosItems = 2;
    let yPosItems = yposDiag + 12;
    datosTareas.map(dato => {
      doc.setFont('Helvetica', 'normal')
      doc.setFontSize(12);
      doc.text(`• ${dato}`, xPosItems, yPosItems);
      yPosItems += 5;
    })


    //Materiales a utilizar
    let tituloMateriales = "Materiales a utilizar".toUpperCase();
    let xTituloMateriales = 2;
    let yTituloMateriales = yPosItems + 4;
    doc.setFont('Helvetica', "bold");
    doc.text(tituloMateriales, xTituloMateriales, yTituloMateriales);


    let xPostMateriales = 2;
    let yPostMateriales = yTituloMateriales + 5;
    datosMateriales.map((dato) =>{
      doc.setFont('Helvetica', 'normal');
      doc.text(`• ${dato}`, xPostMateriales, yPostMateriales);
      yPostMateriales += 5;
    });
  

    //mano de obra

    let tituloManoObra = 'Mano de obra: $';
    let xPosTituloManoObra = 2;
    let yPosTituloManoObra = yPostMateriales + 6;
    doc.text(tituloManoObra, xPosTituloManoObra, yPosTituloManoObra);

    //valor de mano de obra
    let valorManoObra = formData.valorManoObra.toString();
    let xPosValorManoObra = 32;
    let yPosValorManoObra = yPosTituloManoObra;
    doc.text(valorManoObra, xPosValorManoObra, yPosValorManoObra);

    //titulo valor de materiales
    let valorTituloMateriales = 'Materiales: $';
    let xPosValorTituloMateriales = 2;
    let yPosValorTituloMateriales = yPosTituloManoObra + 6;
    doc.text(valorTituloMateriales, xPosValorTituloMateriales, yPosValorTituloMateriales);

    //valor de los materiales
    let valorMateriales = formData.valorMateriales.toString();
    let xPosValorMateriales = 26;
    let yPosValorMateriales = yPosValorTituloMateriales;
    doc.text(valorMateriales, xPosValorMateriales, yPosValorMateriales);



    //generar firma digital
    let firmaDigital = formData.firma.toString();
    let tituloFirma = "Firma: ";
    let xPostFirmaTitulo = 140;
    let yPostFirmaTitulo = yPosValorTituloMateriales + 5;
    let xPostFirmaDigital = 158;
    let yPostFirmaDigital = yPosValorTituloMateriales + 5;

    //Titulo de firma
    doc.text(tituloFirma, xPostFirmaTitulo, yPostFirmaTitulo);

    // Configurar la fuente
    doc.text(firmaDigital, xPostFirmaDigital, yPostFirmaDigital);



    //doc.text('Reporte pdf',10,10);
    //doc.text('Este es un ejemplo de pdf en react',10,20);



    doc.save(tituloPDF);
  }



  return (
    <>
      {/*
       <h2>Generador de pdf</h2>
       <input type="file" accept="image/*" onChange={handleImageUpload} />
       <button onClick={generatePDF}>{nombre}</button>*/}
      <div className='container'>
        <form onSubmit={handleSubmit}>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Ingrese el logo de tu empresa</Form.Label>
            <Form.Control
              type="file"
              name='cargarArchivo'
              accept='image/*'
              onChange={handleImageUpload}

            />
          </Form.Group>
          <div className="mb-3 mt-3">
            <label>Ingrese el nombre del documento: </label>
            <input
              type="text"
              className="form-control"
              placeholder="Ingresa el nombre de tu documento"
              name='nomDoc'
              value={formData.nomDoc}
              onChange={HandleChange}
            />
            {errors.nomDoc && <p style={{ color: 'red' }}>{errors.nomDoc}</p>}
          </div>

          <div className="mb-3 mt-3">
            <label>Ingrese el nombre de la organizacion: </label>
            <input
              type="text"
              className="form-control"
              placeholder="Ingresa el nombre de la empresa"
              name='nom_empresa'
              value={formData.nom_empresa}
              onChange={HandleChange}
            />
            {errors.nom_empresa && <p style={{ color: 'red' }}>{errors.nom_empresa}</p>}
          </div>

          <div className="mb-3 mt-3">
            <label>Ingrese la responsabilidad Social: </label>
            <input
              type="text"
              className="form-control"
              placeholder="Ingresa la responsabilidad social"
              name='responsabilidadSocial'
              value={formData.responsabilidadSocial}
              onChange={HandleChange}
            />
            {errors.responsabilidadSocial && <p style={{ color: 'red' }}>{errors.responsabilidadSocial}</p>}
          </div>

          <div className="mb-3 mt-3">
            <label>Ingrese tu cuit: </label>
            <input
              type="text"
              className="form-control"
              placeholder="Ingresa tu cuit"
              name='cuil'
              value={formData.cuil}
              onChange={HandleChange}
            />
            {errors.cuil && <p style={{ color: 'red' }}>{errors.cuil}</p>}
          </div>


          <div className="mb-3 mt-3">
            <label>Ingrese tu email: </label>
            <input
              type="text"
              className="form-control"
              placeholder="Ingresa tu email"
              name='email'
              value={formData.email}
              onChange={HandleChange}
            />
            {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
          </div>

          <div className="mb-3 mt-3">
            <label>Selecciona una opcion: </label>
            <select

              value={selectedOptionProfesion}
              onChange={handleSelectChange}
              className="form-control"
            >
              <option value=""> -- Seleccionar una profesion -- </option>
              {optionsProfesion.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3 mt-3">
            <label>Ingresa los servicios de su organizacion: </label>
            <textarea
              className="form-control"
              rows="5"
              value={formData.servicios}
              onChange={HandleChange}
              placeholder='Ingrese los servicios que proporciona su organizacion'
              name="servicios" />
          </div>

          <div className="mb-3 mt-3">
            <label>Ingrese el link de su sitio web: </label>
            <input
              className="form-control"
              value={formData.linkSitioWeb}
              onChange={HandleChange}
              placeholder='Ingrese el sitio web de su organizacion'
              name="linkSitioWeb" />
          </div>

          <div className="mb-3 mt-3">
            <label>Ingrese la direccion del lugar donde va a efectuar el trabajo:  </label>
            <input
              className="form-control"
              value={formData.direccion}
              onChange={HandleChange}
              placeholder='Ingrese la direccion del cliente: '
              name="direccion" />
            {errors.direccion && <p style={{ color: 'red' }}>{errors.direccion}</p>}
          </div>


          <div className="mb-3 mt-3">
            <label>Ingrese el diagnostico del trabajo: </label>
            <input
              className="form-control"
              value={formData.diagnostico}
              onChange={HandleChange}
              placeholder='Ingrese el diagnostico del trabajo: '
              name="diagnostico" />
            {errors.diagnostico && <p style={{ color: 'red' }}>{errors.diagnostico}</p>}
          </div>

          <div className="mb-3 mt-3">
            <label>Ingresa las tareas a realizar: </label>
            <textarea
              className="form-control"
              rows="5"
              value={formData.tareasRealizar}
              onChange={HandleChange}
              placeholder='Ingrese las tareas que va a proporciona su organizacion'
              name="tareasRealizar" />
                {errors.tareasRealiza && <p style={{ color: 'red' }}>{errors.tareasRealiza}</p>}
          </div>

          <div className="mb-3 mt-3">
            <label>Ingrese los materiales a utilizar: </label>
            <textarea
              className="form-control"
              rows="5"
              value={formData.materialesRealizar}
              onChange={HandleChange}
              placeholder='Ingrese los mateariales que va a necesitar para el trabajo asignado'
              name="materialesRealizar" />
                {errors.materialesRealizar && <p style={{ color: 'red' }}>{errors.materialesRealizar}</p>}
          </div>

          <div className="mb-3 mt-3">
            <label>Ingrese el valor de mano de obra: </label>
            <input
              className="form-control"
              value={formData.valorManoObra}
              onChange={HandleChange}
              placeholder='Ingrese el valor de mano de obra'
              name="valorManoObra" 
          
              />
                {errors.valorManoObra && <p style={{ color: 'red' }}>{errors.valorManoObra}</p>}
          </div>
          <div className="mb-3 mt-3">
            <label>Ingrese el valor de materiales a utilizar:  </label>
            <input
              className="form-control"
              value={formData.valorMateriales}
              onChange={HandleChange}
              placeholder='Ingrese el valor de materiales para el trabajo asignado'
              name="valorMateriales" 
          
              />
                {errors.valorMateriales && <p style={{ color: 'red' }}>{errors.valorMateriales}</p>}
          </div>

          <div className="mb-3 mt-3">
            <label>Ingrese el nombre de tu firma:  </label>
            <input
              className="form-control"
              value={formData.firma}
              onChange={HandleChange}
              placeholder='Ingrese el nombre de tu firma'
              name="firma" 
          
              />
                {errors.firma && <p style={{ color: 'red' }}>{errors.firma}</p>}
          </div>








          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </>
  )
}


