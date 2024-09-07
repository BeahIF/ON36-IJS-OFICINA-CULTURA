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

  adicionarAluno(cursoId: string, aluno: Aluno) {
    console.log(this.alunos);
    const curso = this.cursos.get(cursoId);
    if (!curso) {
      throw new Error('Curso não encontrado');
    }
    if (
      this.alunos.find((a) => a.id === aluno.id) ||
      curso.listaDeEspera.find((a) => a.id === aluno.id)
    ) {
      throw new Error(
        'Aluno já matriculado neste curso ou na lista de espera.',
      );
    }
    if (curso.alunos.length >= curso.limiteAlunos) {
      curso.listaDeEspera.push(aluno);
      this.cursos.set(cursoId, curso); // Atualiza o curso no repositório
      return 'listaDeEspera'; // Retorna que o aluno foi adicionado à lista de espera
    } else {
      curso.alunos.push(aluno);
      this.cursos.set(cursoId, curso); // Atualiza o curso no repositório
      return 'matriculado'; // Retorna que o aluno foi matriculado
    }

  }

  async buscarPorId(id: string): Promise<Curso | undefined> {
    return this.cursos.get(id);
  }

  async listarAlunosMatriculados(cursoId: string): Promise<Aluno[]> {
    const curso = this.cursos.get(cursoId);
    if (!curso) {
      throw new Error('Curso não encontrado');
    }
    return curso.alunos; // Retorna a lista de alunos matriculados
  }

  async listarAlunosNaListaDeEspera(cursoId: string): Promise<Aluno[]> {
    //acho que esse ainda nao esta funcionando ou na hora de salvar os alunos dalista de espera, preciso debugar
    const curso = this.cursos.get(cursoId);
    if (!curso) {
      throw new Error('Curso não encontrado');
    }
    return curso.listaDeEspera; // Retorna a lista de alunos na lista de espera
  }

}
