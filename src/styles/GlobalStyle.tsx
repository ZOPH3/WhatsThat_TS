import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    // paddingTop: StatusBar.currentHeight,
  },
  scrollView: {},
  text: {
    fontSize: 42,
  },
  containerMain: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomView: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 6,
  },
  btnAdd: {
    width: '100%',
    height: '100%',
    flex: 1,
    marginLeft: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
