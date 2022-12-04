const { connection } = require('../connection/db');
const Alumno = require('../models/alumno');
const {isNumber, isText, isEmpty, isBlank, isValidID} = require('../utils/validators');

const addAlumno = (req, res) => {
  if(!validateFields(req)) return res.status(400).send({})
  let alumno = new Alumno(req);
  try{
    const query = "INSERT INTO alumno (nombres, apellidos, matricula, promedio) VALUES (?, ?, ?, ?)";
    const params = [alumno.nombres, alumno.apellidos, alumno.matricula, alumno.promedio]
    connection.query(query, params, (err, result) => {
      if (err) throw err;
      res.status(201).send(alumno);  
    });
  }
  catch(err){
    res.status(500).send(err);
  }
}

const getAlumnos = (res) => {
  try{
    const query = "SELECT * FROM alumno";
    connection.query(query, (err, result) => {
      if (err) throw err;
      res.status(200).send(result);
    });
  }
  catch(err){
    res.status(500).send(err);
  }
}

const getAlumno = (param, res) => {
  const id = param;
  try{
    const query = "SELECT * FROM alumno WHERE id = ?";
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

const updateAlumno = (req, res, param) => {
  const id = param;
  if(!validateFields(req)) return res.status(400).send({})

  try{
    let query = "UPDATE alumno SET "
    const values = Object.entries(req)
    let params = []
    values.forEach((value, index) => {
      query += `${value[0]} = ?`;
      if(index != values.length - 1) query += ", "
      params.push(value[1])
    }) 
    query += " WHERE id = ?";
    params.push(id)
    connection.query(query, params, (err, result, fields) => {
      if (err) throw err;
      if (result.affectedRows != 1) return res.sendStatus(404);
      getAlumno(id, res)
    });
  }
  catch(err){
    res.status(500).send(err);
  }
}

const updateImgAlumno = (req, res, param) => {
  const id = param;
  // if(!validateFields(req)) return res.status(400).send({})

  try{
    let query = "UPDATE alumno SET "
    const values = Object.entries(req)
    let params = []
    values.forEach((value, index) => {
      query += `${value[0]} = ?`;
      if(index != values.length - 1) query += ", "
      params.push(value[1])
    }) 
    query += " WHERE id = ?";
    params.push(id)
    connection.query(query, params, (err, result, fields) => {
      if (err) throw err;
      if (result.affectedRows != 1) return res.sendStatus(404);
      getAlumno(id, res)
    });
  }
  catch(err){
    res.status(500).send(err);
  }
}

const deleteAlumno = (req, res, param) => {
  const id = param;
  try{
    const query = "DELETE FROM alumno WHERE id = ?";
    const params = [id];
    connection.query(query, params, (err, result) => {
      if (err) throw err;
      console.log(result);
      if (result.affectedRows != 1) return res.sendStatus(404);
      return res.sendStatus(200);
    });
  }
  catch(err){
    res.status(500).send(err);
  }
}

const validateFields = ({nombres, apellidos, matricula, promedio}) => {
  if(isEmpty(nombres) || isEmpty(apellidos) || 
      isEmpty(matricula) || isEmpty(promedio)) return false;
1
  if(isBlank(matricula) || isBlank(nombres) || isBlank(apellidos)) return false;   
  return isValidID(matricula) && isText(nombres) && isText(apellidos)
  && isNumber(promedio)
}

module.exports = {addAlumno, getAlumnos, getAlumno, updateAlumno, deleteAlumno}
