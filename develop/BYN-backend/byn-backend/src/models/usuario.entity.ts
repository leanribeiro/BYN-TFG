import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Rutina } from './rutina.entity';
import { Progreso } from './progreso.entity';

@Entity('usuario')
export class Usuario {
  @PrimaryGeneratedColumn()
  id!: number; 

  @Column({ type: 'varchar', length: 100 })
  nombre!: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  email!: string;

  @Column({ type: 'varchar', length: 255 })
  password!: string;

  @Column({ type: 'enum', enum: ['ENTRENADOR', 'CLIENTE'], default: 'CLIENTE' })
  role!: 'ENTRENADOR' | 'CLIENTE' ; 

  @OneToMany(() => Rutina, (rutina) => rutina.entrenador)
  rutina!: Rutina[];

  @OneToMany(() => Progreso, (progreso) => progreso.usuario)
  progreso!: Progreso[];
}
