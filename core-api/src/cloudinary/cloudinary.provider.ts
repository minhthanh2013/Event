/* eslint-disable prettier/prettier */
import { v2 } from 'cloudinary';
import { CLOUDINARY } from '../constants';

export const CloudinaryProvider = {
  provide: CLOUDINARY,
  useFactory: () => {
    return v2.config({
      cloud_name: 'dv7air4el',
      api_key: '384989763159426',
      api_secret: 'z2xLVIJCsKcU_-RNq4fYNeZYyiU',
    });
  },
};