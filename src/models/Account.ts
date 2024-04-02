import { z } from 'zod';

export interface User {
  id: number;
  appUsername: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
  createTs: Date;
}

export interface RegisterRequest {
  appUsername: string;
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  username: string;
}
export interface UpdateRequest {
  appUsername: string;
  firstName: string;
  lastName: string;
}
export interface UpdatePasswordRequest {
  currentPassword: string;
  confirmPassword: string;
  newPassword: string;
}
export const registerSchema = z
  .object({
    appUsername: z.string().min(3, 'Min length must be 3'),
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

export const updateSchema = z.object({
  appUsername: z.string().min(3, 'Min length must be 3'),
  firstName: z.string().min(2, 'Min length must be 2'),
  lastName: z.string().min(2, 'Min length must be 2'),
});
export const updatePasswordSchema = z
  .object({
    newPassword: z.string().min(6, 'Min length must be 6'),
    confirmPassword: z.string(),
  })
  .superRefine(({ confirmPassword, newPassword }, ctx) => {
    if (confirmPassword !== newPassword) {
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
