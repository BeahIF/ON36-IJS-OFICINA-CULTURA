import { IsNumber, IsString, IsEmail, IsNotEmpty } from 'class-validator';
export class CreateAlunoDto {
  @IsString()
  nome: string;

  @IsString()
  endereco: string;

  @IsString()
  telefone: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
  
  @IsNumber()
  anoNascimento: number;
}
