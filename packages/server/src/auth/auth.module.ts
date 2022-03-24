import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UserModule } from 'src/user/user.module';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { ConfigService, ConfigModule } from '@nestjs/config';

@Module({
   imports: [
      ConfigModule,
      PassportModule,
      JwtModule.registerAsync({
         imports: [ConfigModule],
         inject: [ConfigService],
         useFactory: async (configService: ConfigService) => {
            return {
               signOptions: {
                  expiresIn: configService.get('JWT_EXPIRE'),
               },
               secret: configService.get('JWT_SECRET'),
            };
         },
      }),
      UserModule,
   ],
   providers: [AuthService, AuthResolver, LocalStrategy, JwtStrategy],
   exports: [AuthService],
})
export class AuthModule {}
