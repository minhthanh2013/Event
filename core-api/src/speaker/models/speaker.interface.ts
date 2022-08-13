/* eslint-disable prettier/prettier */
export interface Speaker {
  speaker_id: string;
  is_accepted: boolean;
}

export interface SpeakerResponseDto {
  speaker_name: string;
  speaker_email: string;
  zoom_meeting_id: string;
}
