import React, { useContext } from 'react';
import ServicesContext from './context';

const useService = () => {
  const context = useContext(ServicesContext);
  if (context === undefined) {
    throw new Error('useServiceContext must be used within a ServiceProvider');
  }
  return context;
};

export default useService;
