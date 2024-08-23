import { Injectable } from '@nestjs/common';
import { CursoRepository } from 'src/cursos/application/ports/course.repository';
import { CursoEntity } from '../entities/curso.entity';
import { CursoMapper } from '../mappers/curso.mapper';
import { Curso } from 'src/cursos/domain/course';
import { Aluno } from 'src/alunos/domain/aluno';

@Injectable()
export class InMemoryCursoRepository implements CursoRepository {
  private alunos: Aluno[] = [];

  private readonly cursos = new Map<string, CursoEntity>();

  async salvar(curso: Curso): Promise<Curso> {
    const persistenceModel = CursoMapper.paraPersistencia(curso);
    this.cursos.set(persistenceModel.id, persistenceModel);
    const newEntity = this.cursos.get(persistenceModel.id);
    return CursoMapper.paraDominio(newEntity);
  }

  async listar(): Promise<Curso[]> {
    const entities = Array.from(this.cursos.values());
    return entities.map((item) => CursoMapper.paraDominio(item));
  }
  // nao sei fazer isso ainda
 
  adicionarAluno(aluno: Aluno) {
    if (this.alunos.find((a) => a.id === aluno.id)) {
      throw new Error('Aluno já matriculado neste curso.');
    }
    this.alunos.push(aluno);
  }
  
  async buscarPorId(id: string): Promise<Curso | undefined> {
    return this.cursos.get(id);
  }
}
