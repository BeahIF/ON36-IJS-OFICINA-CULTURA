import {
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { UpdateAlunoDto } from '../dto/update-aluno.dto';
import { AlunoFactory } from '../domain/factories/aluno-factory';
import { CreateAlunoCommand } from './command/create-aluno-command';
import { AlunoRepository } from './ports/aluno.repository';

@Injectable()
export class AlunosService {
  constructor(
    private readonly alunoRepository: AlunoRepository,
    private readonly alunoFactory: AlunoFactory,
  ) {}

  create(createAlunoCommand: CreateAlunoCommand) {
    console.log("no service")
    this.validarIdadeMinima(createAlunoCommand);
    // this.validarSeJaExiste(createAlunoCommand);

    const novoAluno = this.alunoFactory.criar(
      createAlunoCommand.nome,
      createAlunoCommand.endereco,
      createAlunoCommand.email,
      createAlunoCommand.telefone,
    );

    return this.alunoRepository.salvar(novoAluno);
  }

  findAll() {
    return `This action returns all alunos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} aluno`;
  }

  update(id: number, updateAlunoDto: UpdateAlunoDto) {
    return `This action updates a #${id} aluno`;
  }

  remove(id: number) {
    return `This action removes a #${id} aluno`;
  }

  private validarSeJaExiste(createAlunoCommand: CreateAlunoCommand) {
    const alunoExistente = this.alunoRepository.buscarPorEmail(
      createAlunoCommand.email,
    );
    if (alunoExistente) {
      throw new ConflictException(
        'Já existe um aluno cadastrado com esse email.',
      );
    }
  }

  private validarIdadeMinima(createAlunoCommand: CreateAlunoCommand) {
    const anoAtual = new Date().getFullYear();
    const idade = anoAtual - createAlunoCommand.anoNascimento;
    const IDADE_MIN_CADASTRO = 16;
    if (idade <= IDADE_MIN_CADASTRO) {
      throw new ForbiddenException('A idade mínima para cadastro é 16 anos.');
    }
  }
}
