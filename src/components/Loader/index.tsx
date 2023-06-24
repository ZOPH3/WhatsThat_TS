import React from 'react';
import { View } from 'react-native';

interface ILoaderProps {
    onLoading: any;
    onSuccess: any;
    onEmpty: any;
    onError: any;
}
const Loader = (props: ILoaderProps) => {
  return <View></View>;
};
