import { Aluno } from '../../domain/aluno';

export abstract class AlunoRepository {
  abstract salvar(aluno: Aluno): Promise<Aluno>;
  abstract listar(): Promise<Aluno[]>;
  abstract buscarPorEmail(email: string): Promise<Aluno>;
}