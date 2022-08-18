export class PaymentDto {
    conferenceId: number;
    ticketPrice: number;
    ticketName: string;
    ticketQuantity: number;
}

export class SubscriptionDto {
    idHost: number
}

export class AddBalanceDto {
    balance: number;
    idUser: number;
}

export class BoughtTicketDto {
    conferenceId: number;
    userId: number;
}