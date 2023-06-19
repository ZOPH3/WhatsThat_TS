import React from 'react';

import { TChatSummary } from '../../../lib/types/TSchema';
import ChatSummary from './ChatSummary';
import AvatarComponent from '../../../components/Avatar';

interface IChatSummaryContainer {
  chatSummary: TChatSummary;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  actions: any;
}

const ChatSummaryContainer = ({ chatSummary, actions }: IChatSummaryContainer) => {

  return (
    <ChatSummary
      title={`${chatSummary.name != '' ? chatSummary.name : chatSummary.creator.first_name}`}
      secondary={`${chatSummary.last_message?.message ?? 'No Messages'}`}
      avatar={
        <AvatarComponent
          label={`${chatSummary.name != '' ? chatSummary.name : chatSummary.creator.first_name}`} size={50}
        />
      }
      actions={actions}
    />
  );
};

export default ChatSummaryContainer;
