import React, { useContext } from 'react';
import GlobalContext from './context';

const useGlobal = () => {
  // get the context
  const context = useContext(GlobalContext);

  // if `undefined`, throw an error
  if (context === undefined) {
    throw new Error('useGlobalContext was used outside of its Provider');
  }

  return context;
};

export default useGlobal;
