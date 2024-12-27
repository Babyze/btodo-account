import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountEntity } from './entities/account.entity';
import { BaseAbstractRepository } from 'btodo-utils';

export class AccountRepository extends BaseAbstractRepository<AccountEntity> {
  constructor(
    @InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<AccountEntity>,
  ) {
    super(accountRepository);
  }
}
