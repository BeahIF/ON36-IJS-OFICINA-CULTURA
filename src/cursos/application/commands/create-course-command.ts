export class CreateCursoCommand {
  constructor(
    public readonly nome: string,
    public readonly description: string,
    // public readonly totalDeAlunos: number,
  ) {}
}
