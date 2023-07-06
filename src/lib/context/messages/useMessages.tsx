import { useContext } from 'react';
import MessageContext from './context';

const useMessages = () => {
  // get the context
  const context = useContext(MessageContext);

  // if `undefined`, throw an error
  if (context === undefined) {
    throw new Error('useMessageContext was used outside of its Provider');
  }

  return context;
};

export default useMessages;
