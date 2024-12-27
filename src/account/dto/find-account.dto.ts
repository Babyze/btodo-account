import { Timestamp } from 'btodo-utils';
import { IsBoolean, IsNumber, IsOptional } from 'class-validator';
import { FindAccountRequest, FindAccountResponse } from '../pb/account.pb';

export class FindAccountRequestDto implements FindAccountRequest {
  @IsNumber()
  accountID: number;

  @IsBoolean()
  @IsOptional()
  isDeleted?: boolean;

  @IsOptional()
  createdAt?: Timestamp;
}

export type FindAccountResponseDto = Pick<
  FindAccountResponse,
  'accountID' | 'email' | 'isDeleted'
> & {
  createdAt?: Date;
  updatedAt?: Date;
};
