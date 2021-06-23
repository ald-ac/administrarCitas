import { ui } from './funciones.js';
let DB;

export function crearDB() {
    //creacion bd v 1.0
    const crearDB = window.indexedDB.open('citas', 1);

    //error
    crearDB.onerror = () => {
        console.log('Hubo un error en la creacion de la DB');
    }

    //creada correctamente
    crearDB.onsuccess = () => {
        
        DB = crearDB.result;

        //Imprimir en HTML las citas de la BD si tiene
        leerCitasBD();
    }

    //Definir estructura
    crearDB.onupgradeneeded = (e) => {
        const db = e.target.result;

        const objectStore = db.createObjectStore('citas', {
            keyPath: 'id',
            autoIncrement: true
        });

        //Columnas
        objectStore.createIndex('mascota', 'mascota', { unique: false });
        objectStore.createIndex('propietario', 'propietario', { unique: false });
        objectStore.createIndex('telefono', 'telefono', { unique: false });
        objectStore.createIndex('fecha', 'fecha', { unique: false });
        objectStore.createIndex('hora', 'hora', { unique: false });
        objectStore.createIndex('sintomas', 'sintomas', { unique: false });
        objectStore.createIndex('id', 'id', { unique: true });
    }
}

export function agregarCitaBD(citaObj) {

    //Insertar registro en indexDB
    const transaction = DB.transaction(['citas'], 'readwrite');

    const objectStore = transaction.objectStore('citas');

    objectStore.add(citaObj);

    transaction.oncomplete = () => {
        ui.imprimirAlerta('Se agrego correctamente');
    }
}

export function leerCitasBD() {
    //Leer datos de la BD
    const objectStore = DB.transaction(['citas']).objectStore('citas');
        
    ui.limpiarHTML();

    objectStore.openCursor().onsuccess = (e) => {
        ui.imprimirCitas(e.target.result);
    }
}

export function editarCitasBD(citaObj) {

    //Editar informacion en la BD
    const transaction = DB.transaction(['citas'], 'readwrite');

    const objectStore = transaction.objectStore('citas');

    //Editar con PUT
    objectStore.put(citaObj);

    transaction.oncomplete = () => {
        //Notificar accion
        ui.imprimirAlerta('Se modificó correctamente');
    }

    transaction.onerror = () => {
        console.log('Hubo un error');
    }
}

export function eliminarCitasBD(id) {

    const transaction = DB.transaction(['citas'], 'readwrite');

    const objectStore = transaction.objectStore('citas');

    //Eliminar registro con su ID
    objectStore.delete(id);

    transaction.oncomplete = () => {
        //Notificar
        ui.imprimirAlerta('Cita eliminada correctamente');
    }

    transaction.onerror = () => {
        console.log('Hubo un error');
    }

    //Releer BD e imprimir citas
    leerCitasBD();
}