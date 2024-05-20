import { z } from 'zod';

export const userSchema = z.object({
  name: z.string().optional(),
  username: z.string().min(1, { message: 'username is required' }),
  email: z
    .string()
    .min(1, { message: 'email is required' })
    .email({ message: 'email need to be in email format' }),
  password: z
    .string()
    .min(5, { message: 'password length minimal is 5 character' }),
});

export type Tuser = z.infer<typeof userSchema>;

export const userLoginSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'email is required' })
    .email({ message: 'email need to be in email format' }),
  password: z
    .string()
    .min(5, { message: 'password length minimal is 5 character' }),
});

export type TuserLogin = z.infer<typeof userLoginSchema>;
