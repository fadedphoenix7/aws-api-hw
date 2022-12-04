class Profesor {
  constructor({id, numeroEmpleado, nombres, apellidos, horasClase}){
    this.id = id;
    this.numeroEmpleado = numeroEmpleado;
    this.nombres = nombres;
    this.apellidos = apellidos;
    this.horasClase = horasClase;
  }
}

module.exports = Profesor;