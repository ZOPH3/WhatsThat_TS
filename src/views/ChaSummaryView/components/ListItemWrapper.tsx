import React from 'react';

import { List } from 'react-native-paper';
import { TChatSummary } from '../../../lib/types/TSchema';
import AvatarComponent from '../../../components/Avatar';
import { stringToColour } from '../../../lib/util/ColorGeneratorUtil';

interface IChatSummaryContainer {
  chatSummary: TChatSummary;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  actions: any;
}

function ChatSummaryItemWrapper({ chatSummary, actions }: IChatSummaryContainer) {
  const avatarColour = stringToColour(
    `${chatSummary.chat_id}${
      chatSummary.name !== '' ? chatSummary.name : chatSummary.creator.first_name
    }`
  );
  const avatar = () => (
    <AvatarComponent
      label={`${chatSummary.name !== '' ? chatSummary.name : chatSummary.creator.first_name}`}
      color={avatarColour}
    />
  );

  return (
    <List.Item
      title={`${chatSummary.name !== '' ? chatSummary.name : chatSummary.creator.first_name}`}
      description={`${chatSummary.last_message?.message ?? 'No Messages'}`}
      left={avatar}
      right={props => null}
      onPress={actions.goTo}
      onLongPress={actions.edit}
    />
  );
}

export default ChatSummaryItemWrapper;
