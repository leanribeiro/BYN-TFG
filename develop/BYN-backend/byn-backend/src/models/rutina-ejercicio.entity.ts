import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { RutinaDia } from "./rutina-dia.entity";

// src/models/rutina-ejercicio.entity.ts
@Entity("rutina_ejercicio")
export class RutinaEjercicio {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 100 })
  nombre!: string;

  @Column()
  series!: number;

  @Column()
  repeticiones!: number;

  
  @Column({ nullable: true })
  peso?: string; 

  @Column({ nullable: true })
  descanso?: number;

  @Column({ type: "text", nullable: true })
  notas?: string;

  @ManyToOne(() => RutinaDia, (dia) => dia.ejercicios, { onDelete: "CASCADE" })
  @JoinColumn({ name: "dia_id" })
  dia!: RutinaDia;
}
