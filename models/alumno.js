class Alumno{
  constructor({alumno_id, nombres, apellidos, matricula, promedio}){
    this.id = alumno_id || 0;
    this.nombres = nombres;
    this.apellidos = apellidos;
    this.matricula = matricula;
    this.promedio = promedio;
  }
}

module.exports = Alumno;