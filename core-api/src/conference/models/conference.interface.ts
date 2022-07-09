/* eslint-disable prettier/prettier */
import { AdminEntity } from "src/admin/models/admin.entity";
export interface Conference {
  // conference_id: number;
  conference_name: string;
  admin_id?: AdminEntity;
  conference_type_id?: string;
  conference_category_id?: string;
  description: string;
  address: string;
  date_start_conference: Date;
  date_start_sell: Date;
  date_end_sell: Date;
  date_end_conference: Date;
  isValidated: boolean;
  price: number;
  ticket_quantity: number;
  current_quantity: number;
}
