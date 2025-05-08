import { IsBoolean, IsEmail, IsNumberString, IsPhoneNumber, IsString } from "class-validator";

export class CreateDealerDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsPhoneNumber("BO")
  phone: string;

  @IsString()
  ci: string;

  @IsBoolean()
  active: boolean;
}
