import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './cursos/core/core.module';
import { CursosModule } from './cursos/application/course.module';
import { CursoInfrastructureModule } from './cursos/infrastructure/curso-infrastructure.module';
import { ApplicationBootstrapOptions } from './cursos/common/interfaces/application-bootstrap-options.interface';
import { AlunoModule } from './alunos/application/aluno.module';
import { AlunoInfrastructureModule } from './alunos/infrastructure/aluno-infrastructure.module';

@Module({
  imports: [CoreModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  
  static register(options: ApplicationBootstrapOptions) {
    return {
      module: AppModule,
      imports: [
        CoreModule.forRoot(options), // Aqui entram as opções de configuração do banco de dados
        CursosModule.comInfraestrutura(
          CursoInfrastructureModule.use(options.driver),
        ),
        AlunoModule.comInfraestrutura(
          AlunoInfrastructureModule.use(options.driver),
        ),
      ],
    };
  }
}
