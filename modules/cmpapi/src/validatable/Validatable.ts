import {ValidationResult} from './ValidationResult';

/**
 * Interface requires class implements the validate method
 */
export interface Validatable {

  validate(failCallbackIfNotValid?: boolean): ValidationResult;

}

/**
 * Checks if an object implements the Validatable interface
 * @param {object} obj
 * @return {boolean}
 */
export const isValidatable = (obj: object): obj is Validatable => {

  return obj !== undefined && (obj as Validatable).validate !== undefined;

};
