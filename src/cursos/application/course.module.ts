import { DynamicModule, Module, Type } from '@nestjs/common';
import { CursosController } from '../presenters/http/cursos.controller';
import { CursoFactory } from '../domain/factories/curso.factory';
import { CursosService } from './cursos.service';

@Module({
  controllers: [CursosController],
  providers: [CursosService, CursoFactory],
})
export class CursosModule {
  static comInfraestrutura(infrastructureModule: Type | DynamicModule) {
    return {
      module: CursosModule,
      imports: [infrastructureModule], 
    };
  }
}
