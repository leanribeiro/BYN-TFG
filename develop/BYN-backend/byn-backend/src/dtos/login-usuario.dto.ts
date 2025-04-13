import { IsEmail, IsString } from 'class-validator';

export class LoginUsuarioDTO {
  @IsEmail()
  email!: string;

  @IsString()
  password!: string;
}
