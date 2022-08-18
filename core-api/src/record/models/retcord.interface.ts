/* eslint-disable prettier/prettier */
export interface Record {
    record_id: number;
    conference_id: number;
}

export interface UserRecordRequest {
    user_id: string;
    conference_id: number;
}