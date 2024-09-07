import { Aluno } from 'src/alunos/domain/aluno';

export class CursoEntity {
  id: string;
  nome: string;
  descricao: string;
  alunos: Aluno[];
  listaDeEspera: Aluno[] = [];
  limiteAlunos = 2; //para facilitar o teste no postman
}
