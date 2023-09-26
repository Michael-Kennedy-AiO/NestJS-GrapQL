import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';

@Module({
    imports: [
      TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'localhost',
        port: 9999,
        username: 'postgres',
        password: '23234123',
        database: 'backend-web',
        entities: [UserEntity],
        synchronize: true
        // Setting synchronize: true shouldn't be used in production
        // otherwise you can lose production data.
      }),
    ],
  })
export class DbConnectorModule {}
