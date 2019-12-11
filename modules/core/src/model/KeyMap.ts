/**
 * KeyMap - A map of abstract type (defined by implementer) that is keyed by an
 * integer string id. Example `KeyMap<number>`:
 * ```
 * const myKeyMapOfNumbers: KeyMap<number> = {
 *   "1":2,
 *   "3":4,
 * };
 * ```
 */
export interface KeyMap<T> {

  // Keystring id
  [key: string]: T;
}
