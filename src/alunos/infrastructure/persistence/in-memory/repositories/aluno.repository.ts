import { Injectable } from '@nestjs/common';
import { AlunoRepository } from '../../../../application/ports/aluno.repository';
import { Aluno } from '../../../../domain/aluno';
import { AlunoEntity } from '../entities/aluno.entity';
import { AlunoMapper } from '../mappers/aluno.mapper';

@Injectable()
export class InMemoryAlunoRepository implements AlunoRepository {
  private readonly alunos = new Map<string, AlunoEntity>();

  async salvar(aluno: Aluno): Promise<Aluno> {
    const persistenceModel = AlunoMapper.paraPersistencia(aluno);
    this.alunos.set(persistenceModel.id, persistenceModel);
    const newEntity = this.alunos.get(persistenceModel.id);
    return AlunoMapper.paraDominio(newEntity);
  }

  async listar(): Promise<Aluno[]> {
    const entities = Array.from(this.alunos.values());
    return entities.map((item) => AlunoMapper.paraDominio(item));
  }

  async buscarPorEmail(email: string): Promise<Aluno> {
    console.log('no buscar por email');
    console.log(email);
    console.log(this.alunos.values());
    const entities = Array.from(this.alunos.values());

    console.log(entities);
    const alunoEncontrado = entities.find((item) => item.email === email);
    console.log(alunoEncontrado);
    console.log(!alunoEncontrado);
    if (alunoEncontrado !== undefined) {
      return null;
    }
    return AlunoMapper.paraDominio(alunoEncontrado);
  }
}

// Esse é o nosso adapter para persitencia em memória
