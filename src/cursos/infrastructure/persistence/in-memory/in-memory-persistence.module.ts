import { Module } from '@nestjs/common';
import { CursoRepository } from 'src/cursos/application/ports/course.repository';
import { InMemoryCursoRepository } from './repositories/curso.repository';
@Module({
  imports: [],
  providers: [
    {
      provide: CursoRepository,
      useClass: InMemoryCursoRepository, // É aqui que nós vinculamos uma porta e a um adaptador (a ideia aqui é dizer para o NestJS usar o InMemoryCursoRepository sempre que alguém pedir por um CursoRepository - isso facilita muito a troca de adaptadores, vc não precisa mudar nada no resto do código, só aqui).
    },
  ],
  exports: [CursoRepository],
})
export class InMemoryCursoPersistenceModule {}