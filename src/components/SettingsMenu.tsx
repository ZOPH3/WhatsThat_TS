/* eslint-disable react/require-default-props */
import * as React from 'react';
import { View } from 'react-native';
import { Menu, Avatar, TouchableRipple } from 'react-native-paper';
import { IconSource } from 'react-native-paper/lib/typescript/src/components/Icon';

import { useGlobal } from '../lib/context/global';

export interface IMenuItem {
  title: React.ReactNode;
  leadingIcon?: IconSource | undefined;
  trailingIcon?: IconSource | undefined;
  disabled?: boolean | undefined;
  dense?: boolean | undefined;
  anchor?: React.ReactNode;
  onPress?: () => any;
}

/**
 * MenuItems is a component that renders a list of Menu.Item components,
 * based on the items prop.
 */
function MenuItems(props: { items: IMenuItem[]; closeMenu: () => void }) {
  const { items, closeMenu } = props;
  return (
    <>
      {items.map((menuItem: IMenuItem, key: React.Key) => {
        return (
          <Menu.Item
            key={key}
            onPress={() => {
              menuItem.onPress();
              closeMenu();
            }}
            title={menuItem.title}
            disabled={menuItem.disabled}
          />
        );
      })}
    </>
  );
}

/**
 * SettingsMenu is a component that renders a Menu component with a list of Menu.Item components
 */
function SettingsMenu(props: { items: any; onPress?: () => any }) {
  const { toggleTheme } = useGlobal();
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const { items, onPress } = props;

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
        anchor={
          // <IconButton icon="dots-horizontal" size={20} onPress={openMenu} />

          <TouchableRipple
            onLongPress={openMenu}
            onPress={onPress}
            rippleColor="rgba(0, 0, 0, .32)"
          >
            <Avatar.Icon size={35} icon="account" style={{ margin: 10 }} />
          </TouchableRipple>
        }
      >
        <Menu.Item
          onPress={() => (toggleTheme ? toggleTheme() : console.log('No toggleTheme'))}
          title="Toggle Theme"
        />
        <MenuItems items={items} closeMenu={closeMenu} />
      </Menu>
    </View>
  );
}

export default SettingsMenu;
