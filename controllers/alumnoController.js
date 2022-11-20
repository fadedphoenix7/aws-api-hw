const Alumno = require('../models/alumno');
const router = require('../routes/alumnos');
const {isNumber, isText, isEmpty, isBlank, isValidID} = require('../utils/validators');

let alumnos = [];
1
const addAlumno = (req, res) => {
  const _alumno = req
  if(!validateFields(_alumno)) return res.status(400).send({})
  let alumno = new Alumno(_alumno);
  alumnos.push(alumno);
  res.status(201).send(alumno);
}

const getAlumnos = (res) => {
  res.status(200).send(alumnos);
}

const getAlumno = (param, res) => {
  const id = param;
  const alumnosB = alumnos.filter( (alum) => {
    return alum.id == id ? alum : null
  });
  if (alumnosB.length != 1) return res.sendStatus(404);
  return res.send(200, alumnosB[0]);
}

const updateAlumno = (req, res, param) => {
  const id = param;
  const alumnosB = alumnos.filter( (alum) => {
    return alum.id == id ? alum : null
  });
  if (alumnosB.length != 1) return res.sendStatus(404);
  if(!validateFields(req)) return res.status(400).send({})
  let alumno = alumnosB[0];
  alumno.nombres = req.nombres;
  alumno.apellidos = req.apellidos;
  alumno.matricula = req.matricula;
  alumno.promedio = req.promedio;
  
  res.send(200, alumno);

}

const deleteAlumno = (req, res, param) => {
  const id = param;
  const size = alumnos.length;
  if(size < 1) return res.sendStatus(404);
  alumnos = alumnos.filter( (alum) => {
    return alum.id != id ? alum : null
  });

  if(size == alumnos.length) return res.sendStatus(404)

  res.sendStatus(200);
  
}

const validateFields = ({id, nombres, apellidos, matricula, promedio}) => {
  if(isEmpty(id) || isEmpty(nombres) || isEmpty(apellidos) || 
      isEmpty(matricula) || isEmpty(promedio)) return false;
1
  if(isBlank(matricula) || isBlank(nombres) || isBlank(apellidos)) return false;   
  return isNumber(id) && isValidID(matricula) && isText(nombres) && isText(apellidos)
  && isNumber(promedio)
}

module.exports = {addAlumno, getAlumnos, getAlumno, updateAlumno, deleteAlumno}
