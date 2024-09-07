import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  Res,
} from '@nestjs/common';
import { Response } from 'express'; // Importa a resposta do Express
import { CursosService } from 'src/cursos/application/cursos.service';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';
import { CreateCursoCommand } from 'src/cursos/application/commands/create-course-command';
import { Aluno } from 'src/alunos/domain/aluno';
import { Curso } from 'src/cursos/domain/course';

@Controller('cursos')
export class CursosController {
  constructor(private readonly cursosService: CursosService) {}

  @Post()
  create(@Body() createCursoDto: CreateCursoDto) {
    return this.cursosService.create(
      new CreateCursoCommand(createCursoDto.nome, createCursoDto.description),
    );
  }

  @Post(':cursoId/matricular')
  async matricularAluno(
    @Param('cursoId') cursoId: string,
    @Body() aluno: Aluno,
  ): Promise<{ curso: Curso; mensagem: string }> {
    try {
      return await this.cursosService.matricularAluno(cursoId, aluno);
    } catch (error) {
      if (error.message === 'Curso não encontrado') {
        throw new NotFoundException('Curso não encontrado');
      }
      throw error;
    }
  }

  @Get(':cursoId/alunos-matriculados')
  async getAlunosMatriculados(
    @Param('cursoId') cursoId: string,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const alunosMatriculados =
        await this.cursosService.listarAlunosMatriculados(cursoId);
      return res.status(200).json(alunosMatriculados);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  @Get(':cursoId/alunos-lista-espera')
  async getAlunosListaEspera(
    @Param('cursoId') cursoId: string,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const alunosListaEspera =
        await this.cursosService.listarAlunosNaListaDeEspera(cursoId);
      return res.status(200).json(alunosListaEspera);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
  @Get()
  findAll() {
    return this.cursosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cursosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCursoDto: UpdateCursoDto) {
    return this.cursosService.update(+id, updateCursoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cursosService.remove(+id);
  }
}
