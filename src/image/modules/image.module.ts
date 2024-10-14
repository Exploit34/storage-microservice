import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageController } from '../controllers/image.controller';
import { ImageService } from '../sevices/image.service';
import { Image } from '../entities/image.entity';
import { MulterModule } from '@nestjs/platform-express';
import { DatabaseModule } from '../../db/modules/database.module';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([Image]),
    MulterModule.register({ dest: './uploads'})
  ],
  controllers: [ImageController],
  providers: [ImageService],
})
export class ImageModule {}
