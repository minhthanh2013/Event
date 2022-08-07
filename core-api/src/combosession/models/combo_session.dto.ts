/* eslint-disable prettier/prettier */
import { ConferenceEntity } from "src/conference/models/conference.entity";
export class ComboSessionDto {
  comboSessionId: number;
  comboSessionPrice: number;
  comboSessionName: string;
  comboSessionDescription: string;
  conferenceList: ConferenceEntity[];
}
