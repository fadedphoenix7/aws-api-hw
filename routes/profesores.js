const express = require('express');
const router = express.Router();

const {addProfesor, getProfesores, getProfesor, updateProfesor, deleteProfesor} = require('../controllers/profesoresController');

router.get('/', (req, res) => {
  getProfesores(res);
});

router.post('/', (req, res) => {
  addProfesor(req.body, res);
});

router.get('/:id', (req, res) => {
  getProfesor(req.params.id, res);
});

router.put('/:id', (req, res) => {
  updateProfesor(req.body, res, req.params.id)
});

router.delete('/:id', (req, res) => {
  deleteProfesor(req, res, req.params.id)
});

router.all('*', (req, res) => {
  res.sendStatus(405);
})

module.exports = router;