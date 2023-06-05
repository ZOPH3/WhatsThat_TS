import React from 'react';

import { TChatSummary } from '../../../lib/types/TSchema';
import ChatSummary from './ChatSummary';
import AvatarComponent from '../../../components/Avatar';

interface IChatSummaryContainer {
  chatSummary: TChatSummary;
  actions: IChatSummaryActions;
}

interface IChatSummaryActions {
  delete: () => void;
  edit: () => void;
}

const ChatSummaryContainer = ({ chatSummary, actions }: IChatSummaryContainer) => {
  return (
    <ChatSummary
      title={`${chatSummary.name != '' ? chatSummary.name : chatSummary.creator.first_name}`}
      secondary={`${chatSummary.last_message?.message ?? 'No Messages'}`}
      avatar={
        <AvatarComponent
          text={`${chatSummary.name != '' ? chatSummary.name : chatSummary.creator.first_name}`}
        />
      }
      actions={actions}
    />
  );
};

export default ChatSummaryContainer;
