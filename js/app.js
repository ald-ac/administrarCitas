//Seleccionar inputs
const mascotaInput = document.querySelector('#mascota');
const propietarioInput = document.querySelector('#propietario');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const sintomasInput = document.querySelector('#sintomas');

//formulario
const formulario = document.querySelector('#nueva-cita');

const contenedorCitas = document.querySelector('#citas');

//Clases
class Citas {
    constructor() {
        this.citas = [];
    }

    agregarCita(cita) {
        this.citas = [...this.citas, cita];
    }
}

class UI {
    imprimirAlerta(mensaje, tipo) {
        //Creando div
        const divMensaje =  document.createElement('div');
        divMensaje.classList.add('text-center', 'alert', 'd-block', 'col-12');

        //Tipo = claseTipo
        if(tipo === 'error') {
            divMensaje.classList.add('alert-danger');
        } else {
            divMensaje.classList.add('alert-success');
        }

        //Agregando texto
        divMensaje.textContent = mensaje;

        //Agregandolo al HTML
        document.querySelector('#contenido').insertBefore(divMensaje, document.querySelector('.agregar-cita'));

        //Removiendo alerta
        setTimeout(() => {
            divMensaje.remove();
        }, 5000);
    }

    imprimirCitas({citas}) {
        citas.forEach(cita => {
            const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;

            const divCita = document.createElement('div');
            divCita.classList.add('cita', 'p-3');
            divCita.dataset.id = id;

            //Scripting
            const mascotaP = document.createElement('h2');
            mascotaP.classList.add('card-title', 'font-weight-bolder');
            mascotaP.textContent = mascota;
            
            //Agregar al div
            divCita.appendChild(mascotaP);

            //Insertar al dom
            contenedorCitas.appendChild(divCita);
        });
    }
}

//Instancia
const ui = new UI();
const adminCitas = new Citas();

//Eventos
eventListeners();
function eventListeners() {
    mascotaInput.addEventListener('input', datosCita);
    propietarioInput.addEventListener('input', datosCita);
    telefonoInput.addEventListener('input', datosCita);
    fechaInput.addEventListener('input', datosCita);
    horaInput.addEventListener('input', datosCita);
    sintomasInput.addEventListener('input', datosCita);

    formulario.addEventListener('submit', nuevaCita);
}

const citaObj = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: ''
}

function datosCita(e) {
    //Revisar NAME de html que sea = a propiedad en OBJ
    citaObj[e.target.name] = e.target.value;
}

//Validando cita y agregandolo a adminCitas
function nuevaCita(e) {
    e.preventDefault();

    //extrayendo info
    const { mascota, propietario, telefono, fecha, hora, sintomas } = citaObj;

    //Validando 
    if(mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === '') {
        
        ui.imprimirAlerta('Todos los campos son obligatorios', 'error');

        return;
    }

    //Asignando ID unico
    citaObj.id = Date.now();

    //Agregando cita
    adminCitas.agregarCita({...citaObj}); //Pasar copia de objeto

    //Reiniciar form
    formulario.reset();

    //Reiniciar objeto cita
    reiniciarCita();

    ui.imprimirCitas(adminCitas);
}

function reiniciarCita() {
    citaObj.mascota = '';
    citaObj.propietario = '';
    citaObj.telefono = '';
    citaObj.fecha = '';
    citaObj.hora = '';
    citaObj.sintomas = '';
}