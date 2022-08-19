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
    conferenceAddress: string;
    organizerName: string;
    hostName: string;
    conferenceType: number;
    conferenceCategory: number;
    conferenceDescription: string;
    speakerList: SpeakerList[];
    dateStartConference: Date;
    dateStartSell: Date;
    dateEndSell: Date;
    ticketQuantity: number;
    conferencePrice: number;
    // New fields  
    status_ticket?: string;
	host_id?: number
	conference_id?: number
	address?: string;
    date_start_conference?: Date;
    isRecorded?: boolean;
    isValidated?: boolean;
}

export class SpeakerList {
    email: string;
    name: string;
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