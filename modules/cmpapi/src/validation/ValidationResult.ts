/**
 * The result of a validation
 */
export interface ValidationResult {
  // True if validation passed
  isValid: boolean;
  // An array of messages as to why validation did not pass
  validationMessages: string[];
}
