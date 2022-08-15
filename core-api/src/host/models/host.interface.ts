/* eslint-disable prettier/prettier */
export interface Host {
  host_id?: number;
  user_name: string;
  password: string;
  email?: string;
  first_name: string;
  last_name: string;
  create_at?: Date;
  update_at?: Date;
}

export class HostResponseDto {
  host_id?: number;
  user_name: string;
  email: string;
  firstName: string;
  lastName: string;
}