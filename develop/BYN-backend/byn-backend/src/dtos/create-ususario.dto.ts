import { IsEmail, IsEnum, IsNotEmpty, MinLength } from 'class-validator';
import { Role } from '../models/usuario.entity'; // Enum de roles si lo usás

export class CreateUsuarioDTO {
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  nombre!: string;

  @IsEmail({}, { message: 'Debe ser un email válido' })
  email!: string;

  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password!: string;

  @IsEnum(Role, { message: 'El rol debe ser ENTRENADOR o CLIENTE' })
  role!: Role;
}


