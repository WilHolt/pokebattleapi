import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose'
@Module({
  imports: [
    AuthModule,
    MongooseModule.forRoot('mongodb://root:conta123@ds041367.mlab.com:41367/pokebattle',  
    { useNewUrlParser: true }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
