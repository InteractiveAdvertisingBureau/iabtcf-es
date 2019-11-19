import {ValidationResult} from './ValidationResult';

export interface Validatable {

  validate(failCallbackIfNotValid?: boolean): ValidationResult;

}

export const isValidatable = (obj: object): obj is Validatable => {

  return obj !== undefined && (obj as Validatable).validate !== undefined;

};
