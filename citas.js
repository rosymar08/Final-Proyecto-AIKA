var express = require('express');
var router = express.Router();
var { conexion } = require('../database/conexion.js')

/* GET users listing. */
router.get('/', function(req, res, next) {
  conexion.query('SELECT * FROM cita_medica', (error, cita_medica) => {
    if(error){
      res.status(500).send('Ocurrio un error' + error)
    } else {
      res.status(200).render('citas.hbs', {cita_medica})
    }
  })
});

router.get('/agregar', (req, res) => {
  res.status(200).sendFile('registro-citas.html', {root: 'public'})
})

router.post('/guardar-cita', (req, res) => {
  const cedula = req.body.cedula;
  const fecha = req.body.fecha;
  const especialidad = req.body.especialidad
  conexion.query(`SELECT * FROM medicos WHERE especialidad='${especialidad}'`, (error, medicos) => {
    if (error) {
      res.status(500).send('Error en la consulta ' + error)
    } else {
      const cedulaMedico= medicos[0].cedula
      console.log(cedulaMedico)
      conexion.query(`INSERT INTO cita_medica (id_paciente, id_medico, fecha) VALUES (${cedula}, ${cedulaMedico}, '${fecha}')`, (error, resultado) => {
        if (error) {
          res.status(500).send('Error en la consulta ' + error)
        } else {
          res.redirect('/citas')
        }
      })
    }
  })
})

module.exports = router;

