import {registerDecorator} from 'class-validator';

export function IsConsentLanguage(): Function {

  return (object: Record<string, any>, propertyName: string): void => {

    registerDecorator({
      name: 'IsConsentLanguage',
      target: object.constructor,
      propertyName: propertyName,
      validator: {
        validate(value: string): boolean {

          const ASCII_START = 96;

          if (value.length === 2) {

            const firstLetterCode: number = value.charCodeAt(0) - ASCII_START;
            const secondLetterCode: number = value.charCodeAt(1) - ASCII_START;

            return (firstLetterCode <= 26 && secondLetterCode <= 26);

          } else {

            return false;

          }

        },
      },
    });

  };

}
