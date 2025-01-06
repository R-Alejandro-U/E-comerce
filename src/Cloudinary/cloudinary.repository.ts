import { Injectable } from '@nestjs/common';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import toStream = require('buffer-to-stream');

@Injectable()
export class CloudinaryRepository {
  async uploadImage(file: Express.Multer.File): Promise<UploadApiResponse> {
    const uploadImage = () => {
      return new Promise<UploadApiResponse>((resolve, reject) => {
        const uploadImage = cloudinary.uploader.upload_stream(
          { resource_type: 'auto' },
          (error, result) => {
            if (error) {
              reject(error);
            } else if (result) {
              resolve(result);
            }
          },
        );
        toStream(file.buffer).pipe(uploadImage);
      });
    };
    return await uploadImage();
  }
}
