import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Image } from '../entities/image.entity';
import { CreateImageDto } from '../dto/create-image.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
  ) {}

  async uploadImage(file: Express.Multer.File, createImageDto: CreateImageDto): Promise<Image> {
    if (!file) {
      throw new HttpException('No file uploaded', HttpStatus.BAD_REQUEST);
    }
  
    try {
      // Crea un nuevo objeto de imagen
      const newImage = this.imageRepository.create({
        filename: file.filename,
        originalname: file.originalname,
        url: `uploads/${file.filename}`,
        description: createImageDto.description,
      });
  
      return await this.imageRepository.save(newImage);
    } catch (error) {
      console.error('Error saving image to the database:', error);
      throw new HttpException('Error saving image', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getImages(): Promise<Image[]> {
    try {
      return await this.imageRepository.find();
    } catch (error) {
      console.error('Error fetching images:', error);
      throw new HttpException('Error fetching images', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getImageById(id: number): Promise<Image | null> {
    try {
      const image = await this.imageRepository.findOne({ where: { id } });
      if (!image) {
        throw new HttpException('Image not found', HttpStatus.NOT_FOUND);
      }
      return image;
    } catch (error) {
      console.error('Error fetching image by ID:', error);
      throw new HttpException('Error fetching image by ID', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getImageByFilename(filename: string): Promise<Image | null> {
    try {
      const image = await this.imageRepository.findOne({ where: { filename } });
      if (!image) {
        throw new HttpException('Image not found', HttpStatus.NOT_FOUND);
      }
      return image;
    } catch (error) {
      console.error('Error fetching image by filename:', error);
      throw new HttpException('Error fetching image by filename', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteImage(id: number): Promise<boolean> {
    try {
      const result = await this.imageRepository.delete(id);
      if (result.affected === 0) {
        throw new HttpException('Image not found', HttpStatus.NOT_FOUND);
      }
      return true;
    } catch (error) {
      console.error('Error deleting image:', error);
      throw new HttpException('Error deleting image', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
