const { connection } = require('../connection/db');
const Profesor = require('../models/profesor');
const {isNumber, isText, isEmpty, isBlank} = require('../utils/validators');

const addProfesor = (req, res) => {
  if(!validateFields(req)) return res.status(400).send({})
  let profesor = new Profesor(req);
  try{
    const query = "INSERT INTO profesor (nombres, apellidos, numeroEmpleado, horasClase) VALUES (?, ?, ?, ?)";
    const params = [profesor.nombres, profesor.apellidos, profesor.numeroEmpleado, profesor.horasClase]
    connection.query(query, params, (err, result) => {
      if (err) throw err;
      res.status(201).send(profesor);  
    });
  }
  catch(err){
    res.status(500).send(err);
  }
}

const getProfesores = (res) => {
  try{
    const query = "SELECT * FROM profesor";
    connection.query(query, (err, result) => {
      if (err) throw err;
      res.status(200).send(result);
    });
  }
  catch(err){
    res.status(500).send(err);
  }
}

const getProfesor = (param, res) => {
  const id = param;
  try{
    const query = "SELECT * FROM profesor WHERE id = ?";
    const params = [id];
    connection.query(query, params, (err, result) => {
      if (err) throw err;
      if (result.length != 1) return res.sendStatus(404);
      return res.status(200).send(result[0]);
    });
  }
  catch(err){
    res.status(500).send(err);
  }
}

const updateProfesor = (req, res, param) => {
  const id = param;
  if(!validateFields(req)) return res.status(400).send({})

  try{
    let query = "UPDATE profesor SET nombres = ?, apellidos = ?, numeroEmpleado = ?, horasClase = ?";
    query += " WHERE id = ?";
    const params = [req.nombres, req.apellidos, req.numeroEmpleado, req.horasClase, id]
    connection.query(query, params, (err, result, fields) => {
      if (err) throw err;
      if (result.affectedRows != 1) return res.sendStatus(404);
      getProfesor(id, res)
    });
  }
  catch(err){
    console.error(err);
    res.status(500).send(err);
  }

}

const deleteProfesor = (req, res, param) => {
  const id = param;
  try{
    const query = "DELETE FROM profesor WHERE id = ?";
    const params = [id];
    connection.query(query, params, (err, result) => {
      if (err) throw err;
      if (result.affectedRows != 1) return res.sendStatus(404);
      return res.sendStatus(200);
    });
  }
  catch(err){
    res.status(500).send(err);
  }
  
}

const validateFields = ({numeroEmpleado, nombres, apellidos, horasClase}) => {
  if(isEmpty(numeroEmpleado) || isEmpty(nombres) || 
      isEmpty(apellidos) || isEmpty(horasClase)) return false;

  if(isBlank(nombres) || isBlank(apellidos)) return false;   

  return isNumber(numeroEmpleado) && isText(nombres) && isText(apellidos)
  && isNumber(horasClase)
}

module.exports = {addProfesor, getProfesores, getProfesor, updateProfesor, deleteProfesor}
