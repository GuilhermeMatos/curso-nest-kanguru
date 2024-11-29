import { IsEmail, IsStrongPassword } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDTO {
  @ApiProperty({
    description: 'Email',
    example: 'example@email.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Senha (Necessario senha forte)',
    example: 'g1q4DzB3RLJRgxO',
  })
  @IsStrongPassword()
  senha: string;
}
