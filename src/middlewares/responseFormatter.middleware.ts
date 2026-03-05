import type { Request, Response, NextFunction } from 'express';

export const responseFormatter = (req: Request, res: Response, next: NextFunction) => {
  const originalJson = res.json;

  res.json = (data: any): Response => {
    if (data && typeof data === 'object' && 'success' in data && 'data' in data) {
      return originalJson.call(res, data);
    }

    const formattedData = {
      success: true, 
      data: data,
    };

    return originalJson.call(res, formattedData);
  };

  next();
};