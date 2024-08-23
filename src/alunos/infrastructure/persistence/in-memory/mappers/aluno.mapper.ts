import { Aluno } from '../../../../domain/aluno';
import { AlunoEntity } from '../entities/aluno.entity';

export class AlunoMapper {
  static paraDominio(alunoEntity: AlunoEntity): Aluno {
    console.log("paraDominio")
    const model = new Aluno(
      alunoEntity.id,
      alunoEntity.nome,
      alunoEntity.endereco,
      alunoEntity.email,
      alunoEntity.telefone,
      alunoEntity.cursos,
    );
    return model;
  }

  static paraPersistencia(aluno: Aluno) {
    const entity = new AlunoEntity();
    entity.id = aluno.id;
    entity.nome = aluno.nome;
    entity.endereco = aluno.endereco;
    entity.email = aluno.email;
    entity.telefone = aluno.telefone;
    entity.cursos = aluno.cursos;
    return entity;
  }
}
