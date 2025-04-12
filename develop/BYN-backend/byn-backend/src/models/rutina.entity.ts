import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Usuario } from './usuario.entity';

@Entity('rutina')
export class Rutina {
  @PrimaryGeneratedColumn()
  id!: number; 

  @Column({ type: 'varchar', length: 100 })
  titulo!: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  descripcion!: string;

  @ManyToOne(() => Usuario, (usuario) => usuario.rutina)
  @JoinColumn({ name: 'entrenador_id' }) 
  entrenador!: Usuario;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  fecha_creacion!: Date;
}
