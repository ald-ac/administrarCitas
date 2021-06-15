let DB;

export function crearDB() {
    //creacion bd v 1.0
    const crearDB = window.indexedDB.open('citas', 1);

    //error
    crearDB.onerror = function() {
        console.log('Hubo un error en la creacion de la DB');
    }

    //creada correctamente
    crearDB.onsuccess = function() {
        
        DB = crearDB.result;
    }

    //Definir estructura
    crearDB.onupgradeneeded = function(e) {
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