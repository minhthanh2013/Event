/* eslint-disable prettier/prettier */
import { ConferenceEntity } from "src/conference/models/conference.entity";
export class ComboSessionDto {
  comboSessionId: number;
  comboSessionPrice: number;
  comboSessionName: string;
  comboSessionDescription: string;
  conferenceList: ConferenceEntity[];
}
export class ComboSessionRequestDto {
  listConferenceIds: number[];
  combo_name: string;
  combo_description: string;
  discount: number;
}
