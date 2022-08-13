/* eslint-disable prettier/prettier */
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
    conferenceTypeId: number;
    conferenceCategoryId: number;
    conferenceDescription: string;
    speakerList: SpeakerList[];
    dateStartConference: Date;
    dateStartSell: Date;
    dateEndSell: Date;
    dateEndConference: Date;
    ticketQuantity: number;
    conferencePrice: number;
}

export class SpeakerList {
    emailSpeaker: string;
    nameSpeaker: string;
}

export class SpeakerRequestDto {
    speaker_name: string;
    speaker_email: string;
    conference_id: number;
    is_accepted: boolean;
    uuid: string;
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
    ticketType: string;
}

export class SubmitConferenceRequestDto {
    hostId: number;
    conferenceId: number;
}