import { IsEmail } from 'class-validator';

export class IsAccountExistRequestDto {
  @IsEmail()
  email: string;
}
