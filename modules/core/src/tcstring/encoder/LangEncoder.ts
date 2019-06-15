import {IntEncoder} from './IntEncoder';
import {SpecificEncoder} from './SpecificEncoder';

class LangEncoder implements SpecificEncoder {

  public encode(value: string, numBits: number): string {

    value = value.toUpperCase();
    const intEncoder: IntEncoder = new IntEncoder();

    const ASCII_START = 65;
    const firstLetter: number = value.charCodeAt(0) - ASCII_START;
    const secondLetter: number = value.charCodeAt(1) - ASCII_START;

    numBits = numBits/2;
    const firstLetterBString: string = intEncoder.encode(firstLetter, numBits);
    const secondLetterBString: string = intEncoder.encode(secondLetter, numBits);

    return firstLetterBString + secondLetterBString;

  }

}
export {LangEncoder};
