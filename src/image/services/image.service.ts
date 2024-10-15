import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Image } from '../entities/image.entity';
import { CreateImageDto } from '../dto/create-image.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as admin from 'firebase-admin';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import * as path from 'path';

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
      const uploadPath = path.join(__dirname, '..', '..', 'uploads', file.filename);
      const dir = path.dirname(uploadPath);
  
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
  
      fs.writeFileSync(uploadPath, file.buffer);
  
      const fileName = `${uuidv4()}-${file.originalname}`;
      const bucket = admin.storage().bucket();
      const fileUpload = bucket.file(fileName);
      const stream = fileUpload.createWriteStream({
        metadata: {
          contentType: file.mimetype,
        },
      });
  
      stream.end(file.buffer);
  
      await new Promise((resolve, reject) => {
        stream.on('finish', resolve);
        stream.on('error', (err) => {
          fs.unlinkSync(uploadPath);
          reject(err);
        });
      });
  
      const [url] = await fileUpload.getSignedUrl({
        action: 'read',
        expires: Date.now() + 60 * 60 * 1000,
      });
  
      const newImage = this.imageRepository.create({
        filename: fileName,
        originalname: file.originalname,
        url,
        description: createImageDto.description,
        path: uploadPath,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
  
      return await this.imageRepository.save(newImage);
    } catch (error) {
      console.error('Error uploading image to Firebase:', error.message);
      throw new HttpException('Error uploading image', HttpStatus.INTERNAL_SERVER_ERROR);
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
