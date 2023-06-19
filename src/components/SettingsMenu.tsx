import * as React from 'react';
import { View } from 'react-native';
import { Menu, Divider, IconButton } from 'react-native-paper';
import { useGlobalContext } from '../lib/context/GlobalContext';
import { IconSource } from 'react-native-paper/lib/typescript/src/components/Icon';

interface IMenuItem {
  title: React.ReactNode;
  leadingIcon?: IconSource | undefined;
  trailingIcon?: IconSource | undefined;
  disabled?: boolean | undefined;
  dense?: boolean | undefined;
  onPress?: () => void | undefined;
}

const MenuItems = (props : IMenuItem[]) => {
  return (
    props.map((menu: any) => {
      return <Menu.Item onPress={menu.onPress} title={menu.title} />;
    })
  )
};

const SettingsMenu = (items : IMenuItem[]) => {
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
        <Divider />
        <MenuItems {props} />
      </Menu>
    </View>
  );
};

export default SettingsMenu;
