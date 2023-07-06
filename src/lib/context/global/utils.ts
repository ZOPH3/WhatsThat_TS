import { Platform } from 'react-native';

function isMobile(): boolean {
  if (Platform.OS === 'ios' || Platform.OS === 'android') {
    return true;
  }
  return false;
}

// eslint-disable-next-line import/prefer-default-export
export { isMobile };
