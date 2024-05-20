import { ObjectId } from 'mongodb';
import { infer, z } from 'zod';

export const wishListSchema = z.object({
  userId: z.string().min(1, { message: 'userId is required' }),
  productId: z.string().min(1, { message: 'productId is required' }),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type Twishlist = z.infer<typeof wishListSchema>;
