export class PaymentDto {
    conferenceId: number;
    ticketPrice: number;
    ticketName: string;
    ticketQuantity: number;
}
export class ResponseData {
    status: boolean = true;
    data: any = null;
}