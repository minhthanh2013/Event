/* eslint-disable prettier/prettier */
export interface Conference {
  conference_id: number;
  conference_name: string;
  description: string;
  address: string;
  date_start_conference: Date;
  date_start_sell: Date;
  date_end_sell: Date;
  date_end_conference: Date;
  isValidated: boolean;
}
