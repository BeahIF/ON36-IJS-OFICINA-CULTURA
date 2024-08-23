import { Injectable } from '@nestjs/common';
import { uuid } from 'uuidv4';
import { Curso } from '../course';

@Injectable()
export class CursoFactory {
  criar(nome: string, description: string) {
    const cursoId = uuid();
    const alunosCurso = [];
    return new Curso(cursoId, nome, description, alunosCurso);
  }
}
