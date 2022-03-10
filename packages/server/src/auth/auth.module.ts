import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UserModule } from 'src/user/user.module';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
   imports: [
      PassportModule,
      JwtModule.register({
         signOptions: {
            expiresIn: '60s',
         },
         secret: 'change_me',
      }),
      UserModule,
   ],
   providers: [AuthService, AuthResolver, LocalStrategy],
   exports: [AuthService],
})
export class AuthModule {}
