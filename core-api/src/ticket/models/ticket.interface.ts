/* eslint-disable prettier/prettier */
export interface Ticket {
  ticket_id: number;
  buyer_id?: number;
  conference_id?: number;
  payment_id?: number;
  session_id?: number;
}

export interface BuySessionDto {
  session_id: number;
  buyer_id?: number;
  conference_id?: number;
  payment_id?: number;
}