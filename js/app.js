//Varibles
const btnEnviar = document.querySelector('#enviar');
const formulario = document.querySelector('#enviar-mail');
const btnRst = document.querySelector('#resetBtn');

//Expresion regular para validar correo 
const er =  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// Validar Formularios
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');

cargarEventListeners();

function cargarEventListeners(){
    //Inicia la app
    document.addEventListener('DOMContentLoaded', iniciarApp);

    //Validación de campos
    email.addEventListener('blur', validarFormularios);
    asunto.addEventListener('blur', validarFormularios);
    mensaje.addEventListener('blur', validarFormularios);

    email.addEventListener('click', validarSeleccion);
    asunto.addEventListener('click', validarSeleccion);
    mensaje.addEventListener('click', validarSeleccion);

    //Resetear Formulario
    btnRst.addEventListener('click', resetFormulario);

    //Enviar formulario
    formulario.addEventListener('submit', enviarFormulario);
};

//Funciones
function iniciarApp(){
    btnEnviar.disabled = true;
    btnEnviar.classList.add('cursor-not-allowed', 'opacity-50');
}

function validarFormularios(e){
    const error = document.querySelector('p.error');

    if(e.target.value.length > 0){

        if(!e.target.classList.contains('border')){
            e.target.classList.remove('border-2','border-red-500');
            e.target.classList.add('border');

            error.remove();
        };

    }else{
        e.target.classList.remove('border');
        e.target.classList.add('border-2','border-red-500');

        mostrarError('Todos los campos son obligatorios');
    };

    if(e.target.type === 'email' && e.target.value.length > 0){
        
        
        //El test retorna true si la expresión regular pasa
        if(!er.test(e.target.value)){
            mostrarError('Email no válido');
            e.target.classList.remove('border');
            e.target.classList.add('border-2','border-red-500');
        };
    
    };

    //Expresiones regulares para validar email
    if(er.test(email.value) && asunto.value !== '' && mensaje.value !== ''){
        btnEnviar.disabled = false;
        btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50'); 
    }else if(btnEnviar.disabled === false &&
        !btnEnviar.classList.contains('cursor-not-allowed', 'opacity-50')){
            iniciarApp();
    };
    
};

function validarSeleccion(e){
    if(e.target.classList.contains('border-2', 'border-red-500')){
        e.target.classList.remove('border-2', 'border-red-500');
    };
}

function mostrarError(mensaje){
    const errores = document.querySelectorAll('.error');
    
    if(errores.length === 0){
        const mensajeError = document.createElement('p');

        mensajeError.textContent = mensaje;
        mensajeError.classList.add('border', 'border-red-500', 'text-red-500', 
                                'p-3', 'mt-5', 'text-center', 'error');

        formulario.appendChild(mensajeError);
    }else{
        errores.item(0).remove();
        mostrarError(mensaje);
    };
};

function enviarFormulario(e){
    e.preventDefault();

    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'flex';

    setTimeout(() => {
        spinner.style.display = 'none';

        const mensajeExito= document.createElement('p');
        mensajeExito.textContent = 'El mensaje ha sido enviado exitosamente';
        mensajeExito.classList.add('text-white', 'text-center', 'uppercase', 'font-bold','bg-green-500', 'p-2', 'my-6');

        formulario.insertBefore(mensajeExito, spinner);
        resetFormulario();

        setTimeout( () => {
            mensajeExito.remove();
        },1500);
            
    }, 3000);
};

function resetFormulario(){
    formulario.reset();
    
    iniciarApp();
};