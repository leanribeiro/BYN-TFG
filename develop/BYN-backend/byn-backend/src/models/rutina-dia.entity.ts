import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Rutina } from './rutina.entity';
import { RutinaEjercicio } from './rutina-ejercicio.entity';

@Entity('rutina_dia')
export class RutinaDia {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombre!: string;

  @Column()
  orden!: number;

  @ManyToOne(() => Rutina, (rutina) => rutina.dias, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'rutina_id' })
  rutina!: Rutina;

  @OneToMany(() => RutinaEjercicio, (ej) => ej.dia, { cascade: true })
  ejercicios!: RutinaEjercicio[];
}
