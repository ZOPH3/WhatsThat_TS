import React from 'react';

import { TChatSummary } from '../../../lib/types/TSchema';
import AvatarComponent from '../../../components/Avatar';
import { List } from 'react-native-paper';

interface IChatSummaryContainer {
  chatSummary: TChatSummary;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  actions: any;
}

const ChatSummaryItemWrapper = ({ chatSummary, actions }: IChatSummaryContainer) => {
  return (
    <List.Item
      title={`${chatSummary.name != '' ? chatSummary.name : chatSummary.creator.first_name}`}
      description={`${chatSummary.last_message?.message ?? 'No Messages'}`}
      left={(props) => (
        <AvatarComponent
          label={`${chatSummary.name != '' ? chatSummary.name : chatSummary.creator.first_name}`}
          size={50}
        />
      )}
      right={(props) => null}
      onPress={actions.goTo}
      onLongPress={actions.edit}
    />
  );
};

export default ChatSummaryItemWrapper;
