import { Aluno } from 'src/alunos/domain/aluno';

export class Curso {
  constructor(
    public id: string,
    public nome: string,
    public descricao: string,
    public alunos: Aluno[],
  ) {}
}
