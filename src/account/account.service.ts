import { Injectable } from '@nestjs/common';
import { AccountRepository } from './account.repository';
import { CreateAccountRequestDto } from './dto/create-account.dto';
import {
  FindAccountRequestDto,
  FindAccountResponseDto,
} from './dto/find-account.dto';
import { IsAccountExistRequestDto } from './dto/is-account-exist.dto';
import { AccountEntity } from './entities/account.entity';
import { AlreadyExistError, NotFoundError } from 'btodo-utils';

@Injectable()
export class AccountService {
  constructor(private readonly accountRepository: AccountRepository) {}

  async findAccount(
    payload: FindAccountRequestDto,
  ): Promise<FindAccountResponseDto> {
    const result = await this.accountRepository.findOne({
      where: {
        accountID: payload.accountID,
        isDeleted: payload.isDeleted,
      },
    });

    if (!result) {
      throw new NotFoundError();
    }

    return result;
  }

  async createAccount(
    payload: CreateAccountRequestDto,
  ): Promise<AccountEntity> {
    const isAccountExist = await this.isExist({ email: payload.email });
    if (isAccountExist) {
      throw new AlreadyExistError(`Email ${payload.email} already exist`);
    }

    return this.accountRepository.createAndSave({
      email: payload.email,
      isDeleted: false,
      createdAt: new Date(),
    });
  }

  async isExist(payload: IsAccountExistRequestDto): Promise<boolean> {
    return this.accountRepository.exists({
      where: payload,
    });
  }
}
