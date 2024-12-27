import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountRepository } from './account.repository';
import { AccountService } from './account.service';
import { AccountEntity } from './entities/account.entity';
import { DatabaseModule } from 'btodo-utils';

@Module({
  imports: [DatabaseModule.forFeature([AccountEntity])],
  controllers: [AccountController],
  providers: [AccountService, AccountRepository],
})
export class AccountModule {}
