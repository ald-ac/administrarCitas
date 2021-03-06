import { datosCita, nuevaCita } from '../funciones.js';
import { mascotaInput, propietarioInput, telefonoInput,
    fechaInput, horaInput, sintomasInput, formulario } from '../selectores.js';
import { crearDB } from '../operacionesDB.js';

class App {
    constructor() {
        this.initApp();
    }

    initApp() {
        mascotaInput.addEventListener('input', datosCita);
        propietarioInput.addEventListener('input', datosCita);
        telefonoInput.addEventListener('input', datosCita);
        fechaInput.addEventListener('input', datosCita);
        horaInput.addEventListener('input', datosCita);
        sintomasInput.addEventListener('input', datosCita);

        //Formulario nueva cita
        formulario.addEventListener('submit', nuevaCita);

        //Crear la base de datos
        crearDB();
    }
}

export default App;