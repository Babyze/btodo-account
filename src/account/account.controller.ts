import { AllExceptionFilter } from '@app/common/filters/rpc-to-http-exception.filter';
import { GrpcDataTransformInterceptor } from '@app/common/interceptors/grpc-data-transform-interceptor.interceptor';
import { GrpcDataTransformPipe } from '@app/common/pipes/grpc-data-transform-pipe.pipe';
import {
  Controller,
  UseFilters,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { AccountService } from './account.service';
import {
  CreateAccountRequestDto,
  CreateAccountResponseDto,
} from './dto/create-account.dto';
import {
  FindAccountRequestDto,
  FindAccountResponseDto,
} from './dto/find-account.dto';
import { ACCOUNT_SERVICE_NAME } from './pb/account.pb';

@Controller()
@UsePipes(GrpcDataTransformPipe, ValidationPipe)
@UseInterceptors(GrpcDataTransformInterceptor)
@UseFilters(AllExceptionFilter)
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @GrpcMethod(ACCOUNT_SERVICE_NAME, 'FindAccount')
  private async FindAccount(
    payload: FindAccountRequestDto,
  ): Promise<FindAccountResponseDto> {
    return this.accountService.findAccount(payload);
  }

  @GrpcMethod(ACCOUNT_SERVICE_NAME, 'CreateAccount')
  private async CreateAccount(
    payload: CreateAccountRequestDto,
  ): Promise<CreateAccountResponseDto> {
    return this.accountService.createAccount(payload);
  }
}
