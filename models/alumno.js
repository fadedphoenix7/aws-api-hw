class Alumno{
  constructor({id, nombres, apellidos, matricula, promedio, fotoPerfilUrl}){
    this.id = id || 0;
    this.nombres = nombres;
    this.apellidos = apellidos;
    this.matricula = matricula;
    this.promedio = promedio;
    this.fotoPerfilUrl = fotoPerfilUrl;
  }
}

module.exports = Alumno;