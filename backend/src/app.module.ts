import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET } from './configs/jwt-secret';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri:
          `mongodb+srv://${configService.get<string>('DB_USER', 'defaultUser')}:` +
          `${encodeURIComponent(configService.get<string>('DB_PASS', 'defaultPass'))}` +
          `@${configService.get<string>('DB_HOST', 'defaultHost')}/` +
          `${configService.get<string>('DB_NAME', 'defaultDB')}?` +
          `${configService.get<string>('DB_OPTIONS', 'retryWrites=true&w=majority')}`,
      }),
    }),
    UsersModule,
    AuthModule,
    JwtModule.register({
      global: true,
      secret: JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
