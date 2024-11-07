import { z } from 'zod'

// define the validation schema for the signup form
export const SignupFormSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: "name cannot be empty" })
    .trim(),
  lastName: z
    .string()
    .min(1, { message: "surname cannot be empty" })
    .trim(),
  email: z
    .string()
    .email({ message: "please enter a valid email address" })
    .trim(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/[a-z]/, { message: "Password must contain lowercase letters" })
    .regex(/[A-Z]/, { message: "Password must contain uppercase letters" })
    .regex(/\d/, { message: "Password must contain numbers" })
    .regex(/[^a-zA-Z0-9]/, { message: "Password must contain special characters" })
    .trim(),
  profilePicture: z.string().optional(),
})

// define form state type
export type FormState = {
  errors?: {
    firstName?: string[]
    lastName?: string[]
    email?: string[]
    password?: string[]
  }
  message?: string | null
} | undefined

export interface UserDTO {
  id: string
  username: string
  email: string
  firstName: string
  lastName: string
  profilePicture?: string
  lastLogin?: string
}

export interface SessionData {
  isAuth: boolean
  userId: string
}