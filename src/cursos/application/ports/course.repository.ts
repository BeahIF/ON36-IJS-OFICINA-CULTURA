import { Injectable } from '@nestjs/common';
import { Aluno } from 'src/alunos/entities/aluno.entity';
import { Curso } from 'src/cursos/domain/course';
export abstract class CursoRepository {
  abstract salvar(curso: Curso): Promise<Curso>;
  abstract listar(): Promise<Curso[]>;
  abstract adicionarAluno(cursoId: string, aluno: Aluno): string;
  abstract buscarPorId(id: string): Promise<Curso | undefined>;
  abstract listarAlunosMatriculados(cursoId: string): Promise<Aluno[]>;
  abstract listarAlunosNaListaDeEspera(cursoId: string): Promise<Aluno[]>;
}
