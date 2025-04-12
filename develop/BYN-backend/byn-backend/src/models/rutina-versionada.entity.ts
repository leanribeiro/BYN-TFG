import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Rutina } from './rutina.entity'; 
import { Ejercicio } from './ejercicio.entity';

@Entity('rutina_versionada')
export class RutinaVersionada {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'int' })
  version!: number;

  @Column({ type: 'text', nullable: true })
  cambios?: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  fecha_actualizacion!: Date;


  @ManyToOne(() => Rutina, (rutina) => rutina.versiones)
  @JoinColumn({ name: 'rutina_id' }) 
  rutina!: Rutina;

  @OneToMany(() => Ejercicio, (ejercicio) => ejercicio.rutinaVersionada)
  ejercicios!: Ejercicio[];
}
