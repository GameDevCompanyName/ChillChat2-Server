import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { MessageModule } from './message/message.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, MessageModule, AuthModule]
})
export class AppModule {}
