document.addEventListener('DOMContentLoaded', function(){

  // Seleccionar los elementos de la interfaz
  const inputEmail = document.querySelector('#email');
  const inputAsunto = document.querySelector('#asunto');
  const textArea = document.querySelector('#mensaje');
  const formulario = document.querySelector('#formulario');
  const btnSubmit = document.querySelector('#formulario button[type="submit"]');
  const btnReset = document.querySelector('#formulario button[type="reset"]');
  const spinner = document.querySelector('#spinner');

  const datos = {
    email: '',
    asunto: '',
    mensaje: ''
  };

  // Asignar eventos
  inputEmail.addEventListener('input', validar);
  inputAsunto.addEventListener('input', validar);
  textArea.addEventListener('input', validar);
  formulario.addEventListener('submit', enviarEmail);

  btnReset.addEventListener('click', function (e){
    e.preventDefault();

    reiniciarDatos();

  });

  function enviarEmail(e){
    e.preventDefault();

    spinner.classList.add('flex');
    spinner.classList.remove('hidden');

    setTimeout(() => {
      spinner.classList.add('hidden');
      spinner.classList.remove('flex');
      reiniciarDatos();      
    }, 3000);
  }

  // Validacion que los campos no esten vacios
  function validar(e){
    const id = e.target.id; //Obtener el id del evento
    const referencia = e.target.parentElement; //Obtiene Elemento padre

    // si el campo esta vacio
    if(e.target.value.trim() === ''){
      mostrarAlerta(`El campo ${id} es obligatorio`, referencia);
      datos[e.target.name] = '';
      comprobarDatos();
      return;
    } 

    // Si el id es: 'email' y la validacion es: false
    if(id === 'email' && !validarEmail(e.target.value)){
      mostrarAlerta('El email no es valido', referencia);
      datos[e.target.name] = '';
      comprobarDatos();
      return;
    } 
   
    limpiarAlerta(referencia);
    
    datos[e.target.name] = e.target.value.trim().toLowerCase(); 

    comprobarDatos();

  }

  function mostrarAlerta(mensaje, referencia) {
    limpiarAlerta(referencia);

    // Generar alerta en HTML
    const error = document.createElement('P');
    error.textContent = mensaje;
    error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center');

    referencia.appendChild(error);
  }
  
  // Si el elemento contiene la clase: bg-red-600 borra la alerta anterior
  function limpiarAlerta(referencia){
    const alerta = referencia.querySelector('.bg-red-600');
    
    if(alerta){
      alerta.remove();
    }
  }

  // Devuelve true o false si el email pasa la validacion (expresion regular)
  function validarEmail(email){
    const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    const resultado = regex.test(email);
    console.log(resultado);
    return resultado; //devolvemos el resultado de la exp regular
  }

  function comprobarDatos(){
    if(Object.values(datos).includes('')){
      btnSubmit.classList.add('opacity-50');
      btnSubmit.disabled = true;
      return;
    }  

    btnSubmit.classList.remove('opacity-50');
    btnSubmit.disabled = false;
  }

  function reiniciarDatos(){
    //reiniciar objeto
    datos.email = '';
    datos.asunto = '';
    datos.mensaje = '';

    formulario.reset();
    comprobarDatos();
  }
  
});