const express = require('express');
const router = express.Router();
require('dotenv').config()

const multer = require('multer') // v1.0.5
const multerS3  = require('multer-s3');
const {s3} = require('../connection/aws');


const upload = multer({
  storage: multerS3({
      s3: s3,
      bucket: process.env.BUCKET,
      contentType: multerS3.AUTO_CONTENT_TYPE,
      acl: process.env.ACL_PERMISSION,
      key: function (req, file, cb) {
          let ext ;
          if(file.originalname.includes('.png')) ext = ".png"
          if(file.originalname.includes('.jpg')) ext = ".jpg"
          if(file.originalname.includes('.jpeg')) ext = ".jpeg"
          if(file.originalname.includes('.gif')) ext = ".gif"
          cb(null, `alumno_${req.params.id}${ext}`); 
      }
  })
});

const {addAlumno, getAlumnos, getAlumno, updateAlumno, deleteAlumno, updateImgAlumno} = require('../controllers/alumnoController');

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

router.post('/:id/fotoPerfil', file = upload.single('img'),(req, res) => {
  updateImgAlumno(req.body, req.file, res, req.params.id);
});

router.delete('/:id', (req, res) => {
  deleteAlumno(req, res, req.params.id)
});

router.all('*', (req, res) => {
  res.sendStatus(405);
})

module.exports = router;