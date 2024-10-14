import { Controller, Post, UploadedFile, UseInterceptors, Get, Param, Delete, Body, UseGuards } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageService } from '../services/image.service';
import { CreateImageDto } from '../dto/create-image.dto';
import { Image } from '../entities/image.entity';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@Controller('images')
@UseGuards(JwtAuthGuard)
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@UploadedFile() file: Express.Multer.File, @Body() createImageDto: CreateImageDto): Promise<Image> {
    return await this.imageService.uploadImage(file, createImageDto);
  }

  @Get('all')
  async getImages(): Promise<Image[]> {
    return await this.imageService.getImages();
  }

  @Get(':id')
  async getImageById(@Param('id') id: number): Promise<Image | null> {
    return await this.imageService.getImageById(id);
  }

  @Delete(':id')
  async deleteImage(@Param('id') id: number): Promise<boolean> {
    return await this.imageService.deleteImage(id);
  }
}
