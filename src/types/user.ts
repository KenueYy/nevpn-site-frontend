export type UserRole = 'user' | 'admin'

export interface Profile {
  id: string
  email: string
  role: UserRole
  created_at: string
}

export interface LoginUser {
  id: string
  email: string
  role: UserRole
  created_at: string
}

export interface LoginResponse {
  message: string
  user: LoginUser
}

export interface SendCodeResponse {
  message: string
  retry_after: number
}

export interface AuthUser {
  id: string
  email: string
  role: UserRole
  createdAt?: string
}
