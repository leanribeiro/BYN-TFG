import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { RutinaVersionada } from './rutina-versionada.entity';
import { Progreso } from './progreso.entity';

@Entity('ejercicio')
export class Ejercicio {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 100 })
  nombre!: string;

  @Column({ type: 'int' })
  series!: number;

  @Column({ type: 'int' })
  repeticiones!: number;

  @Column({ type: 'int' })
  segundos_descansos!: number;


  @ManyToOne(() => RutinaVersionada, (rutinaVersionada) => rutinaVersionada.ejercicios)
  @JoinColumn({ name: 'rutina_version_id' })
  rutinaVersionada!: RutinaVersionada;

  @OneToMany(() => Progreso, (progreso) => progreso.ejercicio)
  progreso!: Progreso[];
}
