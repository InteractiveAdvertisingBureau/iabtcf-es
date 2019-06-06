import {registerDecorator, ValidationArguments} from 'class-validator';

export function IsIntWithinBits(property: number): Function {

  return (object: Record<string, any>, propertyName: string): void => {

    registerDecorator({
      name: 'IsIntWithinBits',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      validator: {
        validate(value: number, args: ValidationArguments): boolean {

          const [relatedPropertyName] = args.constraints;
          const relatedValue: number = (args.object as any)[relatedPropertyName];

          return (Math.pow(value, 2) <= Math.pow(relatedValue, 2));

        },
      },
    });

  };

}
