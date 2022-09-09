/* eslint-disable prettier/prettier */
export class User {
  user_id?: number;
  user_name: string;
  password: string;
  email: string;
  first_name: string;
  last_name: string;
  create_at?: Date;
  update_at?: Date;
  category?: string[];
}
/* eslint-disable prettier/prettier */
export class UserResponseDto {
  user_id?: number;
  user_name: string;
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
  balance: number;
}