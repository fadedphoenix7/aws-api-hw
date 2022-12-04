class Alumno{
  constructor({id, nombres, apellidos, matricula, promedio}){
    this.id = id || 0;
    this.nombres = nombres;
    this.apellidos = apellidos;
    this.matricula = matricula;
    this.promedio = promedio;
  }
}

module.exports = Alumno;