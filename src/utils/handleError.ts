import { HttpException, NotFoundException } from '@nestjs/common';

export const handleError = (error: any) => {
  if (error instanceof NotFoundException) {
    throw new HttpException(error.message, 404);
  }

  if (error instanceof HttpException) {
    throw error;
  }

  const message =
    error.response?.message || error?.message || `Internal server error`;
  const status = error.response?.statusCode || 500;
  throw new HttpException(message, status);
};
