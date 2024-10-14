import { Controller, Post, Get, Delete, Param, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ImageService } from '../sevices/image.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Image } from '../entities/image.entity';
import { CreateImageDto } from '../dto/create-image.dto';

@Controller('images')
export class ImageController {
  constructor(
    private readonly imageService: ImageService
  ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(@UploadedFile() file: Express.Multer.File): Promise<Image> {
    return this.imageService.uploadImage(file);
  }

  @Get('uploadget')
  async getImages(): Promise<Image[]> {
    return this.imageService.getImages();
  }

  @Get(':id')
  async getImageById(@Param('id') id: number): Promise<Image> {
    return this.imageService.getImageById(id);
  }

  @Delete(':id')
  async deleteImage(@Param('id') id: number): Promise<void> {
    return this.imageService.deleteImage(id);
  }
}
