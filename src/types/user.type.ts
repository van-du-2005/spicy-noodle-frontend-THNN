// src/types/user.type.ts
import { USER_ROLE } from '@/constants';

export type UserRole = typeof USER_ROLE[keyof typeof USER_ROLE];

export interface IUser {
  user_id: number;
  name: string;
  email: string;
  date_of_birth?: string | null; // DATEONLY trong Sequelize trả về chuỗi YYYY-MM-DD
  address?: string | null;
  phone?: string | null;
  email_verified: boolean;
  google_id?: string | null;
  role: UserRole;
  total_points: number;
  avatar_url?: string | null;
  // Các trường token thường chỉ dùng ở Backend, nhưng có thể thêm nếu cần
  password_reset_token?: string | null;
  email_verification_token?: string | null;
}