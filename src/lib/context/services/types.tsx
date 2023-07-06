import { TSingleMessage } from '../../types/TSchema';

export type TDraftMessage = {
  draft_id: number;
  chat_id: number;
  message: Partial<TSingleMessage>;
  created_at: number;
  scheduled: number;
  sent: boolean;
};
