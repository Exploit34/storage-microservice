import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageController } from '../controllers/image.controller';
import { ImageService } from '../services/image.service';
import { Image } from '../entities/image.entity';
import { MulterModule } from '@nestjs/platform-express';
import { DatabaseModule } from '../../db/modules/database.module';
import { diskStorage } from 'multer';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([Image]),
    MulterModule.register({
      limits: { fileSize: 15 * 1024 * 1024 },
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
          cb(null, `${file.fieldname}-${uniqueSuffix}-${file.originalname}`);
        },
      }),
    }),
  ],
  controllers: [ImageController],
  providers: [ImageService],
})
export class ImageModule {}
