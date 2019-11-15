export interface Command {

  validate(validationMessage: string, failCallbackIfNotValid?: boolean): boolean;

  execute(): void;

}
