import { Curso } from 'src/cursos/domain/course';
import { CursoEntity } from '../entities/curso.entity';

export class CursoMapper {
  static paraDominio(cursoEntity: CursoEntity): Curso {
    const model = new Curso(
      cursoEntity.id,
      cursoEntity.nome,
      cursoEntity.descricao,

      cursoEntity.alunos,
    );
    return model;
  }

  static paraPersistencia(curso: Curso) {
    const entity = new CursoEntity();
    entity.id = curso.id;
    entity.nome = curso.nome;
    entity.descricao = curso.descricao;

    entity.alunos = curso.alunos;
    return entity;
  }
}
