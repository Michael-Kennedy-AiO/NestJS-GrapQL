import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DbConnectorModule } from './db-connector/db-connector.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default'
@Module({
  imports: [UserModule, DbConnectorModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: "tienduong.grapql",
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()]
    }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
