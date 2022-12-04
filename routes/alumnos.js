const express = require('express');
const router = express.Router();

const {addAlumno, getAlumnos, getAlumno, updateAlumno, deleteAlumno} = require('../controllers/alumnoController');

router.get('/', (req, res) => {
  getAlumnos(res);
});

router.post('/', (req, res) => {
  addAlumno(req.body, res);
});

router.get('/:id', (req, res) => {
  getAlumno(req.params.id, res);
});

router.put('/:id', (req, res) => {
  updateAlumno(req.body, res, req.params.id)
});

router.post('/:id/fotoPerfil', (req, res) => {
  updateImgAlumno(req.body, res, req.params.id);
});

router.delete('/:id', (req, res) => {
  deleteAlumno(req, res, req.params.id)
});

router.all('*', (req, res) => {
  res.sendStatus(405);
})

module.exports = router;