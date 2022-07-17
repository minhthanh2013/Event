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