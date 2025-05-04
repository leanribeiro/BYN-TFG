import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { Usuario } from "./usuario.entity";
import { RutinaVersionada } from "./rutina-versionada.entity";
import { RutinaDia } from "./rutina-dia.entity";

@Entity("rutina")
export class Rutina {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 100 })
  titulo!: string;

  @Column({ type: "varchar", length: 100 })
  descripcion!: string;

  @ManyToOne(() => Usuario, (usuario) => usuario.rutina)
  @JoinColumn({ name: "entrenador_id" })
  entrenador!: Usuario;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  fecha_creacion!: Date;

  @Column({ type: "varchar", length: 50, nullable: true })
  tipo!: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  objetivo!: string;

  @OneToMany(() => RutinaVersionada, (versionada) => versionada.rutina)
  versiones!: RutinaVersionada[];

  @OneToMany(() => RutinaDia, (dia) => dia.rutina, { cascade: true })
  dias!: RutinaDia[];
}
