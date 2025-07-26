import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { FarmersModule } from './farmers/farmers.module';

@Module({
  imports: [
    ConfigModule.forRoot(), // habilita o uso do .env
    MongooseModule.forRoot(process.env.MONGO_URI!), FarmersModule, // usa a string do .env
  ],
})
export class AppModule {}