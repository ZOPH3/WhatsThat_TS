import React from 'react';
import { TChatSummary } from '../../types/TSchema';
import ChatSummary from './ChatSummary';

interface IChatSummaryContainer {
  chatSummary: TChatSummary;
  actions: IChatSummaryActions;
}

interface IChatSummaryActions {
  delete: () => void;
  edit: () => void;
}

const ChatSummaryContainer = ({ chatSummary, actions }: IChatSummaryContainer) => {
  return <ChatSummary title={''} secondary={''} />;
};

export default ChatSummaryContainer;
