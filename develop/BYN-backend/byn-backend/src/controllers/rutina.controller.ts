import { Request, Response } from "express";
import dataSource from "../data-source";
import { Rutina } from "../models/rutina.entity";
import { Usuario } from "../models/usuario.entity";
import { RutinaDia } from "../models/rutina-dia.entity";
import { RutinaEjercicio } from "../models/rutina-ejercicio.entity";
import { RutinaAsignada } from "../models/rutina-asignada.entity";

export const getAllRoutines = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const routinesRepository = dataSource.getRepository(Rutina);

    const users = await routinesRepository.find();

    res.json(users);
  } catch (err) {
    console.error("Error al obtener rutinas:", err);
    res.status(500).json({ error: "Error al obtener rutinas" });
  }
};

export const createRoutine = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { titulo, descripcion, tipo, objetivo, entrenadorId, dias } =
      req.body;

    if (!titulo || !descripcion || !entrenadorId || !Array.isArray(dias)) {
      res
        .status(400)
        .json({ error: "Faltan campos requeridos o días inválidos" });
      return;
    }

    const rutinaRepo = dataSource.getRepository(Rutina);
    const usuarioRepo = dataSource.getRepository(Usuario);

    const entrenador = await usuarioRepo.findOneBy({ id: entrenadorId });

    if (!entrenador) {
      res.status(404).json({ error: "Entrenador no encontrado" });
      return;
    }

    const rutina = rutinaRepo.create({
      titulo,
      descripcion,
      tipo,
      objetivo,
      entrenador,
      dias: dias.map((dia: any, i: number) => ({
        nombre: dia.nombre,
        orden: dia.orden ?? i + 1,
        ejercicios: dia.ejercicios?.map((e: any) => ({
          nombre: e.nombre,
          series: e.series,
          repeticiones: e.repeticiones,
          peso: e.peso,
          notas: e.notas,
        })),
      })),
    });

    const saved = await rutinaRepo.save(rutina);

    res.status(201).json(saved);
  } catch (err) {
    console.error("Error al crear rutina:", err);
    res.status(500).json({ error: "Error al crear rutina" });
  }
};

export const getRoutinesByEntrenador = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const entrenadorId = parseInt(req.params.entrenadorId);

    if (isNaN(entrenadorId)) {
      res.status(400).json({ error: "ID de entrenador inválido" });
      return;
    }

    const rutinaRepo = dataSource.getRepository(Rutina);

    const rutinas = await rutinaRepo.find({
      where: {
        entrenador: {
          id: entrenadorId,
        },
      },
      relations: ["entrenador"], // si necesitas la info del entrenador
      order: {
        fecha_creacion: "DESC",
      },
    });
    res.json(rutinas);
  } catch (err) {
    console.error("Error al obtener rutinas por entrenador:", err);
    res.status(500).json({ error: "Error al obtener rutinas" });
  }
};

export const getRoutineById = async (req: Request, res: Response) => {
  try {
    const rutinaId = parseInt(req.params.id);
    const rutinaRepo = dataSource.getRepository(Rutina);

    const rutina = await rutinaRepo.findOne({
      where: { id: rutinaId },
      relations: ["dias", "dias.ejercicios"], // ⚠️ esto asume que tenés "ejercicios" en la entidad "RutinaDia"
    });

    if (!rutina) {
      res.status(404).json({ error: "Rutina no encontrada" });
      return;
    }

    res.json(rutina);
  } catch (err) {
    console.error("Error al obtener rutina:", err);
    res.status(500).json({ error: "Error al obtener rutina" });
  }
};

export const updateRoutine = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const rutinaId = parseInt(req.params.id);
    const { titulo, descripcion, tipo, objetivo, dias } = req.body;

    const rutinaRepo = dataSource.getRepository(Rutina);
    const diaRepo = dataSource.getRepository(RutinaDia);

    const rutina = await rutinaRepo.findOne({
      where: { id: rutinaId },
      relations: ["dias", "dias.ejercicios"],
    });

    if (!rutina) {
      res.status(404).json({ error: "Rutina no encontrada" });
      return;
    }

    // Eliminar días anteriores (y ejercicios en cascada)
    await diaRepo.remove(rutina.dias);

    // Asignar nuevos valores
    rutina.titulo = titulo;
    rutina.descripcion = descripcion;
    rutina.tipo = tipo;
    rutina.objetivo = objetivo;

    // Crear nuevos días con ejercicios
    rutina.dias = dias.map((dia: any, index: number) => {
      const nuevoDia = new RutinaDia();
      nuevoDia.nombre = dia.nombre;
      nuevoDia.orden = dia.orden ?? index + 1;
      nuevoDia.ejercicios = dia.ejercicios.map((ej: any) => {
        const nuevoEjercicio = new RutinaEjercicio();
        nuevoEjercicio.nombre = ej.nombre;
        nuevoEjercicio.series = ej.series;
        nuevoEjercicio.repeticiones = ej.repeticiones;
        nuevoEjercicio.peso = ej.peso;
        nuevoEjercicio.notas = ej.notas;
        return nuevoEjercicio;
      });
      return nuevoDia;
    });

    const updated = await rutinaRepo.save(rutina);

    res.status(200).json(updated);
  } catch (err) {
    console.error("Error al actualizar rutina:", err);
    res.status(500).json({ error: "Error al actualizar rutina" });
  }
};

export const deleteRoutine = async (req: Request, res: Response): Promise<void> => {
  try {
    const rutinaId = parseInt(req.params.id);

    const rutinaRepo = dataSource.getRepository(Rutina);

    const rutina = await rutinaRepo.findOne({
      where: { id: rutinaId },
      relations: ["dias", "dias.ejercicios"], // necesario para borrado en cascada
    });

    if (!rutina) {
      res.status(404).json({ error: 'Rutina no encontrada' });
      return;
    }

    await rutinaRepo.remove(rutina);

    res.status(200).json({ message: 'Rutina eliminada correctamente' });
  } catch (err) {
    console.error("Error al eliminar rutina:", err);
    res.status(500).json({ error: 'Error al eliminar rutina' });
  }
};


export const asignarRutinaAUsuario = async (req: Request, res: Response): Promise<void> => {
  try {
    const { usuarioId, rutinaId, entrenadorId } = req.body;

    if (!usuarioId || !rutinaId || !entrenadorId) {
      res.status(400).json({ error: 'Faltan datos para asignar la rutina' });
      return;
    }

    const rutinaAsignadaRepo = dataSource.getRepository(RutinaAsignada);
    const usuarioRepo = dataSource.getRepository(Usuario);
    const rutinaRepo = dataSource.getRepository(Rutina);

    const usuario = await usuarioRepo.findOneBy({ id: usuarioId });
    const rutina = await rutinaRepo.findOneBy({ id: rutinaId });
    const entrenador = await usuarioRepo.findOneBy({ id: entrenadorId });

    if (!usuario || !rutina || !entrenador) {
      res.status(404).json({ error: 'Usuario, rutina o entrenador no encontrados' });
      return;
    }

    const asignacion = rutinaAsignadaRepo.create({
      usuario,
      rutina,
      entrenador,
    });

    const saved = await rutinaAsignadaRepo.save(asignacion);

    res.status(201).json(saved);
  } catch (err) {
    console.error("Error al asignar rutina:", err);
    res.status(500).json({ error: "Error al asignar rutina" });
  }
};