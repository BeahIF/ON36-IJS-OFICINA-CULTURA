import { Module } from '@nestjs/common';
import { InMemoryCursoPersistenceModule } from './persistence/in-memory/in-memory-persistence.module';
import { CursosController } from '../presenters/http/cursos.controller';
import { CursosService } from '../application/cursos.service';
import { CursoFactory } from '../domain/factories/curso.factory';

@Module({
  controllers: [CursosController],
  providers: [CursosService, CursoFactory],
})
export class CursoInfrastructureModule {
  static use(driver: 'in-file' | 'in-memory') {
    const persistenceModule = InMemoryCursoPersistenceModule;

    return {
      module: CursoInfrastructureModule,
      imports: [persistenceModule],
      exports: [persistenceModule],
    };
  }
}

// Esse é o módulo responsável por exportar o módulo de persistência que queremos usar.
// É como se ele fosse uma chave que nos permite escolher qual módulo de persistência queremos usar.
// Nós podemos escolher entre os módulos de persistência existentes.
// Isso é feito configurando o driver.

// Ambos InFileCursoPersistenceModule e InMemoryCursoPersistenceModule exportam o AlunoRepository,
// isso nos permite facilmente trocar de um para o outro sem precisar mudar nada no resto da aplicação.
