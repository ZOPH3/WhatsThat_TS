import React, { useContext } from 'react';

import ApiContext from './context';

const useApi = () => {
  // get the context
  const context = useContext(ApiContext);

  // if `undefined`, throw an error
  if (context === undefined) {
    throw new Error('useAuthContext was used outside of its Provider');
  }

  return context;
};

export default useApi;
