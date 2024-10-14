import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from '../entities/image.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private imageRepository: Repository<Image>,
  ) {}

  async uploadImage(file: Express.Multer.File): Promise<Image> {
    try {
      const bucket = admin.storage().bucket();
      const fileName = `${uuidv4()}-${file.originalname}`;
      const fileUpload = bucket.file(fileName);
  
      await fileUpload.save(file.buffer, {
        metadata: { contentType: file.mimetype },
      });
  
      const [url] = await fileUpload.getSignedUrl({
        action: 'read',
        expires: '03-01-2500',
      });
  
      const image = this.imageRepository.create({
        url,
        filename: fileName,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
  
      await this.imageRepository.save(image);
  
      return image;
    } catch (error) {
      throw new Error(`Error uploading image: ${error.message}`);
    }
  }

  async getImages(): Promise<Image[]> {
    return this.imageRepository.find();
  }

  async getImageById(id: number): Promise<Image> {
    if (!Number.isInteger(id)) {
      throw new Error('Invalid ID. ID must be a number.');
    }
    return this.imageRepository.findOneBy({ id });
  }

  async deleteImage(id: number): Promise<void> {
    const image = await this.getImageById(id);
    if (image) {
      try {
        const fileName = image.url.split('/').pop().split('?')[0];
        const file = admin.storage().bucket().file(fileName);
  
        await file.delete();
  
        await this.imageRepository.delete(id);
      } catch (error) {
        throw new Error(`Error deleting image: ${error.message}`);
      }
    } else {
      throw new Error('Image not found');
    }
  }
}
