import { IsEmail } from 'class-validator';
import { FindAccountResponse } from '../pb/account.pb';

export class CreateAccountRequestDto
  implements Pick<FindAccountResponse, 'email'>
{
  @IsEmail()
  email: string;
}
