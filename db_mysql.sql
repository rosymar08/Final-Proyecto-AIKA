CREATE DATABASE hospital;

USE hospital;

CREATE TABLE `medicos` (
  `cedula` int PRIMARY KEY,
  `nombres` varchar(100),
  `apellidos` varchar(50),
  `especialidad` varchar(150),
  `consultorio` char(3),
  `correo` varchar(100)
);

CREATE TABLE `pacientes` (
  `cedula` int PRIMARY KEY,
  `nombre` varchar(50),
  `apellido` varchar(100),
  `edad` int,
  `telefono` int
);

CREATE TABLE `cita_medica` (
  `id_paciente` int,
  `id_medico` int,
  `fecha` date
);

ALTER TABLE `cita_medica` ADD FOREIGN KEY (`id_paciente`) REFERENCES `pacientes` (`cedula`);

ALTER TABLE `cita_medica` ADD FOREIGN KEY (`id_medico`) REFERENCES `medicos` (`cedula`);

ALTER TABLE `hospital`.`cita_medica`
ADD COLUMN `id` INT NOT NULL AUTO_INCREMENT FIRST,
ADD PRIMARY KEY (`id`);
