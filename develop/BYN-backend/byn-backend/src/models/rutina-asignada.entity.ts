import { CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "./usuario.entity";
import { Rutina } from "./rutina.entity";

@Entity('rutina_asignada')
export class RutinaAsignada {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Usuario, (usuario) => usuario.rutinasAsignadas)
  @JoinColumn({ name: 'usuario_id' })
  usuario!: Usuario;

  @ManyToOne(() => Rutina)
  @JoinColumn({ name: 'rutina_id' })
  rutina!: Rutina;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'entrenador_id' })
  entrenador!: Usuario; 

  @CreateDateColumn({ name: 'fecha_asignacion' })
  fechaAsignacion!: Date;
}
