import { Injectable } from '@nestjs/common';
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
  async matricularAluno(
    cursoId: string,
    aluno: Aluno,
  ): Promise<{ curso: Curso; mensagem: string }> {
    console.log(aluno);
    const curso = await this.cursoRepository.buscarPorId(cursoId);
    if (!curso) {
      throw new Error('Curso não encontrado');
    }
    const status = this.cursoRepository.adicionarAluno(cursoId, aluno);

    // Define a mensagem com base no status retornado
    const mensagem =
      status === 'listaDeEspera'
        ? `Aluno ${aluno.id} adicionado à lista de espera do curso.`
        : `Aluno ${aluno.id} matriculado com sucesso no curso.`;

    // Retorna o curso e a mensagem apropriada
    return { curso: await this.cursoRepository.salvar(curso), mensagem };
  }

  async listarAlunosMatriculados(cursoId: string): Promise<Aluno[]> {
    return this.cursoRepository.listarAlunosMatriculados(cursoId);
  }

  async listarAlunosNaListaDeEspera(cursoId: string): Promise<Aluno[]> {
    return this.cursoRepository.listarAlunosNaListaDeEspera(cursoId);
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
