import { Module } from '@nestjs/common';
import { ApplicationBootstrapOptions } from '../common/interfaces/application-bootstrap-options.interface';

@Module({})
export class CoreModule {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static forRoot(options: ApplicationBootstrapOptions) {
    const imports = [];
    // options.driver === 'typeorm // aqui podem entrar multiplas configurações de banco de dados

    return {
      module: CoreModule,
      imports,
    };
  }
}
