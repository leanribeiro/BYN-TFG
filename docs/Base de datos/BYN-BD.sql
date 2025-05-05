-- Desactivar claves foráneas durante la carga inicial
SET FOREIGN_KEY_CHECKS = 0;

-- Borrar datos previos si existen
DROP TABLE IF EXISTS progreso;
DROP TABLE IF EXISTS rutina_ejercicio;
DROP TABLE IF EXISTS ejercicio;
DROP TABLE IF EXISTS rutina_versionada;
DROP TABLE IF EXISTS rutina;
DROP TABLE IF EXISTS usuario;

-- Crear tabla de usuarios (con relación entrenador-cliente)
CREATE TABLE usuario (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('ENTRENADOR', 'CLIENTE') DEFAULT 'CLIENTE',
  entrenador_id INT DEFAULT NULL,
  FOREIGN KEY (entrenador_id) REFERENCES usuario(id)
);

-- Crear la tabla de rutinas
CREATE TABLE rutina (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(100) NOT NULL,
  descripcion TEXT,
  entrenador_id INT NOT NULL,
  fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (entrenador_id) REFERENCES usuario(id)
);

-- Crear la tabla de versiones de las rutinas
CREATE TABLE rutina_versionada (
  id INT AUTO_INCREMENT PRIMARY KEY,
  rutina_id INT NOT NULL,
  version INT NOT NULL,
  cambios TEXT,
  fecha_actualizacion DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (rutina_id) REFERENCES rutina(id)
);

-- Crear la tabla de ejercicios independientes
CREATE TABLE ejercicio (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  series INT NOT NULL,
  repeticiones INT NOT NULL,
  segundos_descansos INT NOT NULL
);

-- Tabla intermedia: ejercicios en versiones de rutina
CREATE TABLE rutina_ejercicio (
  id INT AUTO_INCREMENT PRIMARY KEY,
  rutina_version_id INT NOT NULL,
  ejercicio_id INT NOT NULL,
  orden INT NOT NULL,
  FOREIGN KEY (rutina_version_id) REFERENCES rutina_versionada(id),
  FOREIGN KEY (ejercicio_id) REFERENCES ejercicio(id)
);

-- Crear la tabla de progreso
CREATE TABLE progreso (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT NOT NULL,
  ejercicio_id INT NOT NULL,
  peso FLOAT NOT NULL,
  notas TEXT,
  logged_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (usuario_id) REFERENCES usuario(id),
  FOREIGN KEY (ejercicio_id) REFERENCES ejercicio(id)
);

-- Insertar usuarios (2 entrenadores, 8 clientes)
INSERT INTO usuario (id, nombre, email, password, role, entrenador_id) VALUES
(1, 'Juan Pérez', 'juanperez@example.com', 'password1', 'ENTRENADOR', NULL),
(2, 'Ana García', 'anagarcia@example.com', 'password2', 'ENTRENADOR', NULL),
(3, 'Carlos López', 'carloslopez@example.com', 'password3', 'CLIENTE', 1),
(4, 'Laura Fernández', 'laura@example.com', 'password4', 'CLIENTE', 1),
(5, 'Miguel Torres', 'miguel@example.com', 'password5', 'CLIENTE', 2),
(6, 'Lucía Gómez', 'lucia@example.com', 'password6', 'CLIENTE', 2),
(7, 'Pedro Ramírez', 'pedro@example.com', 'password7', 'CLIENTE', 1),
(8, 'Sofía Morales', 'sofia@example.com', 'password8', 'CLIENTE', 2),
(9, 'Diego Castro', 'diego@example.com', 'password9', 'CLIENTE', 1),
(10, 'María Rojas', 'maria@example.com', 'password10', 'CLIENTE', 2);

-- Insertar rutinas
INSERT INTO rutina (id, titulo, descripcion, entrenador_id) VALUES
(1, 'Rutina de Fuerza 1', 'Rutina enfocada en fuerza', 1),
(2, 'Cardio y Resistencia', 'Para mejorar capacidad cardiovascular', 1),
(3, 'Full Body Avanzado', 'Rutina completa para intermedios', 1),
(4, 'Rutina Básica', 'Para quienes comienzan', 2),
(5, 'Hipertrofia 1', 'Ganar masa muscular', 2),
(6, 'Piernas Potentes', 'Piernas y glúteos', 1),
(7, 'Espalda Fuerte', 'Fortalecer la espalda', 2),
(8, 'HIIT Express', 'Entrenamiento intenso y corto', 1),
(9, 'Abdominales en Casa', 'Sin equipo', 2),
(10, 'Movilidad y Flexibilidad', 'Mejorar movilidad general', 2);

-- Insertar versiones de rutina
INSERT INTO rutina_versionada (id, rutina_id, version, cambios) VALUES
(1, 1, 1, 'Versión inicial'),
(2, 1, 2, 'Agregado ejercicio de piernas'),
(3, 2, 1, 'Versión inicial'),
(4, 3, 1, 'Versión inicial'),
(5, 4, 1, 'Versión inicial'),
(6, 5, 1, 'Versión inicial'),
(7, 6, 1, 'Versión inicial'),
(8, 7, 1, 'Versión inicial'),
(9, 8, 1, 'Versión inicial'),
(10, 9, 1, 'Versión inicial');

-- Insertar ejercicios base (catálogo)
INSERT INTO ejercicio (id, nombre, series, repeticiones, segundos_descansos) VALUES
(1, 'Press de banca', 4, 8, 90),
(2, 'Sentadilla', 4, 10, 90),
(3, 'Peso muerto', 3, 6, 120),
(4, 'Trote', 1, 20, 0),
(5, 'Jumping jacks', 3, 30, 30),
(6, 'Burpees', 4, 15, 60),
(7, 'Curl de bíceps', 3, 12, 60),
(8, 'Prensa de pierna', 4, 10, 90),
(9, 'Remo con barra', 4, 8, 90),
(10, 'Sprints', 5, 30, 30);

-- Asociar ejercicios a versiones de rutina
INSERT INTO rutina_ejercicio (rutina_version_id, ejercicio_id, orden) VALUES
(1, 1, 1), -- Press de banca
(1, 2, 2), -- Sentadilla
(2, 3, 1), -- Peso muerto
(3, 4, 1), -- Trote
(3, 5, 2), -- Jumping jacks
(4, 6, 1), -- Burpees
(5, 7, 1), -- Curl de bíceps
(6, 8, 1), -- Prensa de pierna
(7, 9, 1), -- Remo con barra
(8, 10, 1); -- Sprints

-- Insertar progreso de ejercicios por usuarios
INSERT INTO progreso (usuario_id, ejercicio_id, peso, notas) VALUES
(3, 1, 60.0, 'Buena forma'),
(4, 2, 70.0, 'Podría mejorar'),
(5, 3, 80.0, 'Difícil'),
(6, 4, 0.0, 'Cardio suave'),
(7, 5, 0.0, 'Alta intensidad'),
(8, 6, 0.0, 'Muy cansado'),
(9, 7, 10.0, 'Peso ligero'),
(10, 8, 100.0, 'Primer intento'),
(3, 9, 40.0, 'Sin problemas'),
(4, 10, 0.0, 'Excelente ritmo');

-- Reactivar claves foráneas
SET FOREIGN_KEY_CHECKS = 1;
