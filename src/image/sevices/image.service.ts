import { Injectable } from '@nestjs/common';
import { Storage } from 'firebase-admin/storage';
import * as admin from 'firebase-admin';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from '../entities/image.entity';
import { v4 as uuidv4 } from 'uuid';
import { storage } from '../../firebase/config/firebase.config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

@Injectable()
export class ImageService {
  private storage = new Storage();
  
  constructor(
    @InjectRepository(Image)
    private imageRepository: Repository<Image>,
  ) {
    this.storage = admin.storage();
  }

  async uploadImage(file: Express.Multer.File): Promise<Image> {
    const imageRef = ref(storage, file.originalname);
    const bucket = this.storage.bucket();
    const fileName = `${uuidv4()}-${file.originalname}`;
    const fileUpload = bucket.file(fileName);

    await uploadBytes(imageRef, file.buffer);

    const imageUrl = await getDownloadURL(imageRef);

    const image = this.imageRepository.create({
      url: imageUrl,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await this.imageRepository.save(image);

    await fileUpload.save(file.buffer, {
      metadata: { contentType: file.mimetype },
    });

    return image;
  }

  async getImages(): Promise<Image[]> {
    return this.imageRepository.find();
  }

  async getImageById(id: number): Promise<Image> {
    return this.imageRepository.findOneBy({ id });
  }

  async deleteImage(id: number): Promise<void> {
    await this.imageRepository.delete(id);
  }
}
