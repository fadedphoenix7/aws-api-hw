class Profesor {
  constructor({profresor_id, numeroEmpleado, nombres, apellidos, horasClase}){
    this.id = profresor_id;
    this.numeroEmpleado = numeroEmpleado;
    this.nombres = nombres;
    this.apellidos = apellidos;
    this.horasClase = horasClase;
  }
}

module.exports = Profesor;