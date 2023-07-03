var express = require('express');
var router = express.Router();
const { conexion } = require('../database/conexion.js')

router.get('/', function (req, res, next) {
    conexion.query('SELECT cm.id,cm.fecha, cm.id_paciente, mas.nombre, med.nombres, med.apellidos, med.consultorio FROM cita_medica cm, pacientes mas, medicos med WHERE cm.id_paciente = mas.cedula AND cm.id_medico= med.cedula', (error, results) => {
        if (error) {
            console.log("Error en la consulta", error)
            res.status(500).send("Error en la consulta")
        } else {
            res.render('cita', { title: 'cita', cita: results })
        }
    });
});

router.get('/agregar', (req, res) => {
  res.status(200).sendFile('cita.html', {root: 'public'})
})

router.get('/agregar-cita', function (req, res, next) {
    conexion.query('SELECT cedula FROM pacientes', (error, results) => {
        if (error) {
            console.log("Error en la consulta", error)
            res.status(500).send("Error en la consulta")
        } else {
            conexion.query('SELECT especialidad FROM medicos', (error, results2) => {
                if (error) {
                    console.log("Error en la consulta", error)
                    res.status(500).send("Error en la consulta")
                } else {
                  res.render('/cita');
                }
            });
        }
    });
});

router.post('/agregar-cita', function (req, res, next) {
    const cedula = req.body.cedula;
    const fecha = req.body.fecha;
    const especialidad = req.body.especialidad;
    conexion.query(`SELECT cedula FROM medicos WHERE especialidad='${especialidad}'`, (error, results) => {
        if (error) {
            console.log("Error en la consulta", error)
            res.status(500).send("Error en la consulta")
        } else {
            let cedulaMedico = results[0].cedula
            conexion.query(`INSERT INTO cita_medica (id_paciente, id_medico, fecha) VALUES (${cedula},${cedulaMedico}, '${fecha}')`, (error, result) => {
                if (error) {
                    console.log("Ocurrio un error en la ejecución", error)
                    res.status(500).send("Error en la consulta");
                } else {
                    res.redirect('/cita');
                }
            });
        }
    });
})
//eliminar citas
router.get('/eliminar/:id', function (req, res, next) {
    const id = req.params.id
    conexion.query(`DELETE FROM cita_medica WHERE id=${id}`, (error, results) => {
        if (error) {
            console.log("Error en la consulta", error)
            res.status(500).send("Error en la consulta")
        } else {
            res.redirect('/cita')
        }
    });
});

module.exports = router;
