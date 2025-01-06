import { v2 } from 'cloudinary';
import 'dotenv/config';
import { cloudinaryConfig } from './envs';

export const CloudinaryConfig = {
  provide: 'cloudinary',
  useFactory: () =>
    v2.config({
      cloud_name: cloudinaryConfig.cloud_name,
      api_key: cloudinaryConfig.api_key,
      api_secret: cloudinaryConfig.api_secret,
    }),
};
