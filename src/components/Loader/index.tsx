import React from 'react';
import { View } from 'react-native';

export interface IComponentState {
  state: 'loading' | 'success' | 'empty' | 'error' | undefined;
}

interface IComponents {
  onLoading?: any;
  onSuccess?: any;
  onEmpty?: any;
  onError?: any;
}

// Template to deal with state of component.
const ComponentContainer = (
  props: { name: string } & IComponentState & IComponents
) => {
  const { name, state, onLoading, onSuccess, onEmpty, onError } = props;

  if (state === 'loading') {
    return onLoading ? onLoading : <View></View>;
  }

  if (state === 'success') {
    return onSuccess ? onSuccess : <View></View>;
  }

  if (state === 'empty') {
    return onEmpty ? onEmpty : <View></View>;
  }

  if (state === 'error') {
    return onError ? onError : <View></View>;
  }

  return;
};

export default ComponentContainer;

/**
 * Usage:
 *  <ComponentRender
 *    name="ComponentName"
 *    state="loading"
 *    onLoading={<View><Text>Loading...</Text></View>}
 *    onSuccess={<View><Text>Success</Text></View>}
 *    onEmpty={<View><Text>Empty</Text></View>}
 *    onError={<View><Text>Error</Text></View>}
 * />
 */
