const Profesor = require('../models/profesor');
const router = require('../routes/profesores');
const {isNumber, isText, isEmpty, isBlank} = require('../utils/validators');

let profesores = [];
1
const addProfesor = (req, res) => {
  const _profesor = req
  if(!validateFields(_profesor)) return res.status(400).send({})
  let profesor = new Profesor(_profesor.id, 
                            _profesor.numeroEmpleado, 
                            _profesor.nombres,
                            _profesor.apellidos,
                            _profesor.horasClase);
  profesores.push(profesor);
  res.status(201).send(profesor);
}

const getProfesores = (res) => {
  res.status(200).send(profesores);
}

const getProfesor = (param, res) => {
  const id = param;
  const profesors = profesores.filter( (prof) => {
    return prof.id == id ? prof : null
  });

  if (profesors.length != 1) return res.sendStatus(404);
  return res.send(200, profesors[0]);
}

const updateProfesor = (req, res, param) => {
  const id = param;
  const profesors = profesores.filter( (prof) => {
    return prof.id == id ? prof : null
  });
  if (profesors.length != 1) return res.sendStatus(404);
  if(!validateFields(req)) return res.status(400).send({})
  let profesor = profesors[0];
  profesor.nombres = req.nombres;
  profesor.apellidos = req.apellidos;
  profesor.horasClase = req.horasClase;

  res.send(200, profesor);

}

const deleteProfesor = (req, res, param) => {
  const id = param;
  const size = profesores.length;
  if(size < 1) res.sendStatus(404);
  profesores = profesores.filter( (prof) => {
    return prof.id != id ? prof : null
  });

  if(size == profesores.length) return  res.sendStatus(404)

  res.sendStatus(200);
  
}

const validateFields = ({id, numeroEmpleado, nombres, apellidos, horasClase}) => {
  if(isEmpty(id) || isEmpty(numeroEmpleado) || isEmpty(nombres) || 
      isEmpty(apellidos) || isEmpty(horasClase)) return false;

  if(isBlank(nombres) || isBlank(apellidos)) return false;   

  return isNumber(id) && isNumber(numeroEmpleado) && isText(nombres) && isText(apellidos)
  && isNumber(horasClase)
}

module.exports = {addProfesor, getProfesores, getProfesor, updateProfesor, deleteProfesor}
