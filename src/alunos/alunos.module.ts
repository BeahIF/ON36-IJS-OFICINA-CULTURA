import { Module } from '@nestjs/common';
import { AlunosService } from './application/alunos.service';
import { AlunosController } from './presenters/http/alunos.controller';

@Module({
  controllers: [AlunosController],
  providers: [AlunosService]
})
export class AlunosModule {}
