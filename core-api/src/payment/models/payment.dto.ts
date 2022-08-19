/* eslint-disable prettier/prettier */
export class PaymentDto {
  userId: number;
  conferenceId: number;
  ticketPrice: number;
  ticketName: string;
  ticketQuantity: number;
  description?: string;
}

export class PaymentWithBalanceDto {
  userId: number;
  conferenceId: number;
  ticketPrice: number;
}

export class SubscriptionDto {
  idHost: number;
}

export class AddBalanceDto {
  balance: number;
  idUser: number;
}

export class BoughtTicketDto {
  conferenceId: number;
  userId: number;
}

export class BoughtRecordDto {
  conferenceId: number;
  userId: number;
  payment_method: number;
  price_record: number;
}

export class PaymentRecordDto {
  conferenceId: number;
  userId: number;
  price: number;
  payment_method: number;
  conferenceName: string;
  conferenceDescription?: string;
}

export class PaymentRecordWithBalanceDto {
  conferenceId: number;
  userId: number;
  price: number;
  balance: number;
}