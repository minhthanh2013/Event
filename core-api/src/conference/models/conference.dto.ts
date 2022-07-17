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
    speakerList: SpeakerList[];
    dateStartConference: Date;
    dateStartSell: Date;
    dateEndSell: Date;
    ticketQuantity: number;
    conferencePrice: number;
}

export class SpeakerList {
    emailSpeaker: string;
    nameSpeaker: string;
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