var express = require('express');
var router = express.Router();
var {conexion} = require('../database/conexion.js')

/* GET home page. */
router.get('/', function(req, res, next) {
conexion.query('SELECT * FROM medicos', (error, medicos)=>{
    if(error){
        res.status(500).send('Ocurrio un error en la consulta')
    }else{
        res.status(200).render('medicos.hbs', {medicos , opcion: 'disabled' ,activo: true})
    }
})
});

router.get('/agregar', (req, res) => {
    res.status(200).sendFile('registro-medicos.html', {root: 'public'})
  })

router.post('/guardar-medico', (req, res)=>{
    const cedula  = req.body.cedula 
    const nombres = req.body.nombre
    const apellidos = req.body.apellido
    const correo = req.body.correo
    const consultorio = req.body.consultorio
    const especialidad = req.body.especialidad
    conexion.query(`INSERT INTO medicos (cedula, nombres, apellidos, correo, consultorio, especialidad) VALUES (${cedula}, '${nombres}', '${apellidos}', '${correo}', '${consultorio}', '${especialidad}')`, (error, resultado) => {
      if (error) {
        res.status(500).send('Ocurrio un error en la consulta'+ error)
      } else {
        res.status(200).redirect('/medicos')
      }
    })  
})

router.get('/activar', function (req, res) {
  conexion.query('SELECT * FROM medicos', function (error, results) {
    if (error) {
      console.log("Error en la consulta", error)
      res.status(500).send("Error en la consulta");
    } else {
      res.render('medicos', { medicos: results, opcion: ''});
    }
  });
});

router.post('/actualizar/:cedula', (req, res) => {
  const cedula = req.params.cedula;
  const nombres = req.body.nombres;
  const apellidos = req.body.apellidos;
  const especialidad = req.body.especialidad;
  const consultorio = req.body.consultorio;
  const correo = req.body.correo;
  conexion.query(`UPDATE medicos SET nombres='${nombres}', apellidos='${apellidos}', especialidad='${especialidad}', consultorio='${consultorio}', correo='${correo}'WHERE cedula=${cedula}`, (error, result) => {
    if (error) {
      console.log("Ocurrio un error en la ejecución", error)
      res.status(500).send("Error en la consulta");
    } else {
      res.redirect('/medicos');
    }
  });
})

router.get('/eliminar/:cedula', (req, res) => {
  const cedula = req.params.cedula;
  conexion.query(`DELETE FROM medicos WHERE cedula=${cedula}`, (error, result) => {
    if (error) {
      res.status(500).send("Error en la consulta" + error);
    } else {
      res.status(200).redirect('/medicos');
    }
  })
});

module.exports = router;
