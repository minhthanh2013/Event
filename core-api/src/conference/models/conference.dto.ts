export class ConferenceResponseDto {
    conferenceId: number;
    conferenceName: string;
    conferenceDescription: string;
    conferenceAddress: string;
    conferenceDateStart: Date;
    conferencePrice: number;
}

export class ConferenceRequestDto {
    conferenceName: string;
    hostName: string;
    conferenceType: string;
    conferenceCategory: string;
    conferenceDescription: string;
    speakerEmail: string;
    speakerName: string;
    dateStartConference: Date;
    dateStartSell: Date;
    dateEndSell: Date;
    ticketQuantity: number;
    conferencePrice: number;
}