/**
 * The result of a validation
 */
export interface ValidationResult {
  // True if validation passed
  isValid: boolean;
  // An array of messages concerning the validation result
  validationMessages: string[];
}
