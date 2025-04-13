import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ReadUsuarioDTO {
  @Expose()
  id!: number;

  @Expose()
  nombre!: string;

  @Expose()
  email!: string;

  @Expose()
  role!: string;
}
