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
import {IntMap} from './IntMap.js';
export type KeyMap<T> = IntMap<T>
