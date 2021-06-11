class Cita {
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

export default Cita;