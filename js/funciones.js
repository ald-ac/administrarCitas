import Cita from './classes/Citas.js';
import UI from './classes/Ui.js';
import { agregarCitaBD, leerCitasBD, editarCitasBD } from './operacionesDB.js';

import { mascotaInput, propietarioInput, telefonoInput,
    fechaInput, horaInput, sintomasInput, formulario} from './selectores.js';

//Instancia
export const ui = new UI();
const adminCitas = new Cita();

let editando;

const citaObj = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: ''
}

export function datosCita(e) {
    //Revisar NAME de html que sea = a propiedad en OBJ
    citaObj[e.target.name] = e.target.value;
}

//Validando cita y agregandolo a adminCitas
export function nuevaCita(e) {
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
        
        //Editar en indexDB
        editarCitasBD(citaObj);

        //Btn original
        formulario.querySelector('button[type="submit"]').textContent = 'Crear cita';

        //reiniciar editando
        editando = false;
        
    } else {
        //Asignando ID unico
        citaObj.id = Date.now();

        //Agregando cita
        adminCitas.agregarCita({...citaObj}); //Pasar copia de objeto

        //Insertar cita en la indexDB
        agregarCitaBD(citaObj);
    }

    //Reiniciar form
    formulario.reset();

    //Reiniciar objeto cita
    reiniciarCita();

    leerCitasBD();
}

export function reiniciarCita() {
    citaObj.mascota = '';
    citaObj.propietario = '';
    citaObj.telefono = '';
    citaObj.fecha = '';
    citaObj.hora = '';
    citaObj.sintomas = '';
}

export function eliminarCita(id) {
    //Remover de citas
    adminCitas.eliminarCita(id);
    //Notificar
    ui.imprimirAlerta('Cita eliminada correctamente');
    //Refrescar HTML    
    leerCitasBD();
}

//Cargar modo edicion
export function cargarEdicion(cita) {
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