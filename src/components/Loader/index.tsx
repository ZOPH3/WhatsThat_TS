/* eslint-disable react/require-default-props */
import React from 'react';
import { View } from 'react-native';

export interface IComponentState {
  state: 'loading' | 'success' | 'empty' | 'error' | undefined;
}

interface IComponents {
  onLoading?: unknown;
  onSuccess?: unknown;
  onEmpty?: unknown;
  onError?: unknown;
}

// Template to deal with state of component.
function ComponentContainer(props: { name: string } & IComponentState & IComponents) {
  const { name, state, onLoading, onSuccess, onEmpty, onError } = props;

  if (state === 'loading') {
    return onLoading || <View />;
  }

  if (state === 'success') {
    return onSuccess || <View />;
  }

  if (state === 'empty') {
    return onEmpty || <View />;
  }

  if (state === 'error') {
    return onError || <View />;
  }
}

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
