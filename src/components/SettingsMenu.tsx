import * as React from 'react';
import { View } from 'react-native';
import { Menu, Divider, IconButton } from 'react-native-paper';
import { useGlobalContext } from '../lib/context/GlobalContext';

const SettingsMenu = () => {
  const { toggleTheme } = useGlobalContext();
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
      }}
    >
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={<IconButton icon="dots-horizontal" size={20} onPress={openMenu} />}
      >
        <Menu.Item
          onPress={() => (toggleTheme ? toggleTheme() : console.log('No toggleTheme'))}
          title="Toggle Theme"
        />
        <Menu.Item
          onPress={() => {
            /** */
          }}
          title="Item 2"
        />
        <Divider />
        <Menu.Item
          onPress={() => {
            /** */
          }}
          title="Item 3"
        />
      </Menu>
    </View>
  );
};

export default SettingsMenu;
