import { TChat, TChatSummary } from '../../types/TSchema';

export type TChatInfo = TChat & TChatSummary;

export interface IChatContext {
  chatSummaryList: TChatInfo[];
  dispatcher?: any;
}
