import { Expose, Type } from 'class-transformer';

export class ReadUsuarioDTO {
  @Expose()
  id!: number;

  @Expose()
  nombre!: string;

  @Expose()
  email!: string;

  @Expose()
  role!: 'CLIENTE' | 'ENTRENADOR';

  @Expose()
  @Type(() => ReadUsuarioDTO)
  entrenador?: ReadUsuarioDTO;
}
