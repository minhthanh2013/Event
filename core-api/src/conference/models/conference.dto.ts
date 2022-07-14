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

export class HostCreatedConferenceResponseDto {
    conferenceId: number;
    conferenceName: string;
    conferenceDescription: string;
    dateStartConference: Date;
    ticketQuantity: number;
    currentTicket: number;
    ticketPrice: number;
    statusTicket: string;
}

export class HostCreatedConferenceRequestDto {
    conferenceName: string;
    conferenceType: string;
    conferenceCategory: string;
    conferenceDescription: string;
    listSpeaker: SpeakerRequestDto[];
    eventStart: Date;
    ticketSaleStart: Date;
    ticketSaleEnd: Date;
    ticketPrice: Date;
    ticketQuantity: number;
}

export class SpeakerRequestDto {
    emailSpeaker: string;
    nameSpeaker: string;
}