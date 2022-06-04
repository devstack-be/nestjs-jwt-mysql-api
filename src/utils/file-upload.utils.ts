import { BadRequestException } from '@nestjs/common';
import { extname } from 'path';

export const imageFileFilter = (req, file, callback) => {
  if (!file.mimetype.includes('image')) {
    return callback(
      new BadRequestException('Please, provide a valid image'),
      false,
    );
  }
  callback(null, true);
};

export const editFileName = (req, file, callback) => {
  const name = file.originalname.split('.')[0];
  const fileExtName = extname(file.originalname);
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  callback(null, `${name}-${randomName}${fileExtName}`);
};
