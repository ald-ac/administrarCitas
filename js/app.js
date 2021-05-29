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

let editando;

//Clases
class Citas {
    constructor() {
        this.citas = [];
    }

    agregarCita(cita) {
        this.citas = [...this.citas, cita];
    }

    eliminarCita(idCita) {
        this.citas = this.citas.filter(cita => cita.id !== idCita);
    } 

    editarCita(citaMod) {
        //Iterar en cada cita, cuando se encuentre una bajo la condicion cambiar esa por la nueva modificada
        this.citas = this.citas.map( cita => cita.id === citaMod.id ? citaMod : cita);
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
        this.limpiarHTML();

        citas.forEach(cita => {
            const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;

            const divCita = document.createElement('div');
            divCita.classList.add('cita', 'p-3');
            divCita.dataset.id = id;

            //Scripting
            const mascotaP = document.createElement('h2');
            mascotaP.classList.add('card-title', 'font-weight-bolder');
            mascotaP.textContent = mascota;

            const propietarioP = document.createElement('p');
            propietarioP.innerHTML = `
                <span class="font-weight-bolder">Propietario: </span> ${propietario}
            `;

            const telefonoP = document.createElement('p');
            telefonoP.innerHTML = `
                <span class="font-weight-bolder">Teléfono: </span> ${telefono}
            `;

            const fechaP = document.createElement('p');
            fechaP.innerHTML = `
                <span class="font-weight-bolder">Fecha: </span> ${fecha}
            `;

            const horaP = document.createElement('p');
            horaP.innerHTML = `
                <span class="font-weight-bolder">Hora: </span> ${hora}
            `;

            const sintomasP = document.createElement('p');
            sintomasP.innerHTML = `
                <span class="font-weight-bolder">Sintomas: </span> ${sintomas}
            `;

            //Btn eliminar
            const btnEliminar = document.createElement('button');
            btnEliminar.classList.add('btn', 'btn-danger', 'mr-2');
            btnEliminar.innerHTML = `Eliminar <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>`;
            //Pasar id de la cita
            btnEliminar.onclick = () => eliminarCita(id);
            
            //Btn para editar datos cita
            const btnEditar = document.createElement('button');
            btnEditar.classList.add('btn', 'btn-info', 'mr-2');
            btnEditar.innerHTML = `Editar <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            `;
            btnEditar.onclick = () => cargarEdicion(cita);

            //Agregar al div
            divCita.appendChild(mascotaP);
            divCita.appendChild(propietarioP);
            divCita.appendChild(telefonoP);
            divCita.appendChild(fechaP);
            divCita.appendChild(horaP);
            divCita.appendChild(sintomasP);
            divCita.appendChild(btnEliminar);
            divCita.appendChild(btnEditar);

            //Insertar al dom
            contenedorCitas.appendChild(divCita);
        });
    }

    limpiarHTML() {
        while(contenedorCitas.firstChild) {
            contenedorCitas.firstChild.remove();
        }
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

    if(editando) {
        //Actualizar cita
        adminCitas.editarCita({...citaObj});
        //Btn original
        formulario.querySelector('button[type="submit"]').textContent = 'Crear cita';

        //Notificar accion
        ui.imprimirAlerta('Se modificó correctamente');

        //reiniciar editando
        editando = false;
    } else {
        //Asignando ID unico
        citaObj.id = Date.now();

        //Agregando cita
        adminCitas.agregarCita({...citaObj}); //Pasar copia de objeto

        //Notificar accion
        ui.imprimirAlerta('Se agrego correctamente');
    }

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

function eliminarCita(id) {
    //Remover de citas
    adminCitas.eliminarCita(id);
    //Notificar
    ui.imprimirAlerta('Cita eliminada correctamente');
    //Refrescar HTML    
    ui.imprimirCitas(adminCitas);
}

//Cargar modo edicion
function cargarEdicion(cita) {
    const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;

    //Llenar inputs
    mascotaInput.value = mascota;
    propietarioInput.value = propietario;
    telefonoInput.value = telefono;
    fechaInput.value = fecha;
    horaInput.value = hora;
    sintomasInput.value = sintomas;

    //Llenar objeto (Evitar que no se detecten los campos llenados)
    citaObj.mascota = mascota;
    citaObj.propietario = propietario;
    citaObj.telefono = telefono;
    citaObj.fecha = fecha;
    citaObj.hora = hora;
    citaObj.sintomas = sintomas;
    //IMPORTANTE Obtenerlo para saber de que cita se trata
    citaObj.id = id;

    //Cambiar texto btnAgregar
    formulario.querySelector('button[type="submit"]').textContent = 'Guardar Cambios';
    //Establecer variable
    editando = true;
}