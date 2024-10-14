import { Controller, Post, Get, Delete, Param, UploadedFile, UseInterceptors, Body, HttpException, HttpStatus } from '@nestjs/common';
import { ImageService } from '../services/image.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Image } from '../entities/image.entity';
import { CreateImageDto } from '../dto/create-image.dto';
import { ValidateId } from 'src/middleware/image/image.validation';

@Controller('images')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@UploadedFile() file: Express.Multer.File, @Body() createImageDto: CreateImageDto): Promise<Image> {
    console.log(`Uploaded file: ${file}`);
  
    if (!file) {
      console.error('No file uploaded or file is undefined');
      throw new HttpException('No file uploaded', HttpStatus.BAD_REQUEST);
    }
  
    try {
      return await this.imageService.uploadImage(file, createImageDto);
    } catch (error) {
      console.error('Error during uploadImage:', error);
      throw new HttpException('Error during image upload', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  

  @Get('all')
  async getImages(): Promise<Image[]> {
    return this.imageService.getImages();
  }

  @Get(':id')
  async getImageById(@Param('id', ValidateId) id: number): Promise<Image> {
    const image = await this.imageService.getImageById(id);
    if (!image) {
      throw new HttpException('Image not found', HttpStatus.NOT_FOUND);
    }
    return image;
  }

  @Get('filename/:filename')
  async getImageByFilename(@Param('filename') filename: string): Promise<Image> {
    const image = await this.imageService.getImageByFilename(filename);
    if (!image) {
      throw new HttpException('Image not found', HttpStatus.NOT_FOUND);
    }
    return image;
  }

  @Delete(':id')
  async deleteImage(@Param('id', ValidateId) id: number): Promise<void> {
    const result = await this.imageService.deleteImage(id);
    if (!result) {
      throw new HttpException('Image not found', HttpStatus.NOT_FOUND);
    }
  }
}
