import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Usuario } from './usuario.entity';
import { RutinaVersionada } from './rutina-versionada.entity';
import { Ejercicio } from './ejercicio.entity';

@Entity('progreso')
export class Progreso {
  @PrimaryGeneratedColumn()
  id!: number; 

  @Column({ type: 'float'})
  peso!: number;

  @Column({ type: 'varchar', length: 250})
  notas!: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  logged_at!: Date;


  @ManyToOne(() => Ejercicio, (ejercicio) => ejercicio.progreso)
  @JoinColumn({ name: 'ejercicio_id' }) 
  ejercicio!: Ejercicio;
 
  @ManyToOne(() => Usuario, (usuario) => usuario.rutina)
  @JoinColumn({ name: 'usuario_id' }) 
  usuario!: Usuario;
}
