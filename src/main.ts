import { NestFactory } from '@nestjs/core';
import { AppModule } from './module/app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.enableCors();
  
  try {
    await app.listen(process.env.PORT, () => {
      console.log(`🚀✔ Server is running ${process.env.PORT}`);
    });
  } catch (error){
    console.log(`❌ Server is not running : ${error}`);
  }
}
bootstrap();
