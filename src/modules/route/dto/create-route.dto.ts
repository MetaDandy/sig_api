import { ArrayNotEmpty, IsArray, IsDateString, IsInt, IsNotEmpty, IsNumber, IsString, IsUUID, Matches, Min, registerDecorator, ValidationArguments } from "class-validator";

const TIME_REGEX = /^([01]\d|2[0-3]):[0-5]\d$/;

export class CreateRouteDto {
  @IsDateString({}, { message: 'date must be ISO-8601 (YYYY-MM-DD)' })
  date: string;

  @IsString() 
  @Matches(TIME_REGEX, { message: 'hour_start must be HH:mm' })
  hour_start: string;

  @IsString() 
  @Matches(TIME_REGEX, { message: 'hour_end must be HH:mm' })
  @IsEndAfterStart('hour_start', { message: 'hour_end must be > hour_start' })
  hour_end: string;
  
  @IsString() 
  @IsNotEmpty()
  polyline: string;

  @IsInt() 
  @Min(1)
  delivery_quantity: number;

  @IsNumber() 
  @Min(0)
  total_distance: number;

  @IsUUID()
  dealer_id: string;

  @IsArray() 
  @ArrayNotEmpty() 
  @IsUUID('all', { each: true })
  orders: string[];
}

function IsEndAfterStart(property: string, validationOptions?: any) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'isEndAfterStart',
      target: object.constructor,
      propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropName] = args.constraints;
          const start = (args.object as any)[relatedPropName] as string;
          return start && value > start;
        },
        defaultMessage(args: ValidationArguments) {
          const [relatedPropName] = args.constraints;
          return `${args.property} must be later than ${relatedPropName}`;
        },
      },
    });
  };
}