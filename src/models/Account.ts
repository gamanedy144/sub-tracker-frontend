import { z } from 'zod';

export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
}

export const registerSchema = z
  .object({
    username: z.string().min(3, 'Min length must be 3'),
    email: z.string().email('Invalid email'),
    password: z.string().min(6, 'Min length must be 6'),
    confirmPassword: z.string(),
    firstName: z.string().min(2, 'Min length must be 2'),
    lastName: z.string().min(2, 'Min length must be 2'),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'The passwords did not match',
      });
    }
  });

export interface AuthenticationRequest {
  email: string;
  password: string;
}
export const authenticationSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
