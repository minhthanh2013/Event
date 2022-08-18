export class PaymentDto {
    userId: number;
    conferenceId: number;
    ticketPrice: number;
    ticketName: string;
    ticketQuantity: number;
    description?: string;
}
export class ResponseData {
    status: boolean = true;
    data: any = null;
}

export class SubscriptionDto {
    idHost: number;
}

export class TransactionInfo {
    id: string;
    amount: number;
    created: string;
    currency: string;
    net: number;
    fee: number;
}

export class AddBalanceDto {
    balance: number;
    idUser: number;
}