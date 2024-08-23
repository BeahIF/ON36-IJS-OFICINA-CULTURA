import { Injectable } from '@nestjs/common';
import { CreateCursoDto } from '../presenters/http/dto/create-curso.dto';
import { UpdateCursoDto } from '../presenters/http/dto/update-curso.dto';
import { CursoFactory } from '../domain/factories/curso.factory';
import { CreateCursoCommand } from './commands/create-course-command';
import { CursoRepository } from './ports/course.repository';
import { Aluno } from 'src/alunos/entities/aluno.entity';
import { Curso } from '../domain/course';

@Injectable()
export class CursosService {
  constructor(
    private readonly cursoRepository: CursoRepository,
    private readonly cursoFactory: CursoFactory,
  ) {}
  create(createCursoCommand: CreateCursoCommand) {
    const novoCurso = this.cursoFactory.criar(
      createCursoCommand.nome,
      createCursoCommand.description,
     
    );

    return this.cursoRepository.salvar(novoCurso);
  }
// nao sei onde faltou esse adicionarAluno
  async matricularAluno(cursoId: string, aluno: Aluno): Promise<Curso> {
    const curso = await this.cursoRepository.buscarPorId(cursoId);
    if (!curso) {
      throw new Error('Curso não encontrado');
    }
    curso.adicionarAluno(aluno);
    return this.cursoRepository.salvar(curso);
  }

 
  findAll() {
    return `This action returns all cursos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} curso`;
  }

  update(id: number, updateCursoDto: UpdateCursoDto) {
    return `This action updates a #${id} curso`;
  }

  remove(id: number) {
    return `This action removes a #${id} curso`;
  }
}
