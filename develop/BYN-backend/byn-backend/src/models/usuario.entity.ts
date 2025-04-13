import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Rutina } from './rutina.entity';
import { Progreso } from './progreso.entity';
import { Exclude } from 'class-transformer';

@Entity('usuario')
export class Usuario {
  @PrimaryGeneratedColumn()
  id!: number; 

  @Column({ type: 'varchar', length: 100 })
  nombre!: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  email!: string;

  @Column({ type: 'varchar', length: 255 })
  @Exclude()
  password!: string;

  @Column({ type: 'enum', enum: ['ENTRENADOR', 'CLIENTE'], default: 'CLIENTE' })
  role!: 'ENTRENADOR' | 'CLIENTE' ; 

  @OneToMany(() => Rutina, (rutina) => rutina.entrenador)
  rutina!: Rutina[];

  @OneToMany(() => Progreso, (progreso) => progreso.usuario)
  progreso!: Progreso[];
}


export enum Role {
  ENTRENADOR = 'ENTRENADOR',
  CLIENTE = 'CLIENTE',
}
