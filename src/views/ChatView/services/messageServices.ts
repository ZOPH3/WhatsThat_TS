import { useApiContext } from '../../../lib/context/ApiContext';
import { TSingleMessage } from '../../../lib/types/TSchema';

const { useFetch } = useApiContext();

const messageServices = (chat_id: number) => {
  if (!useFetch) throw new Error('useFetch is not defined');

  const sendMessage = async (message: TSingleMessage) => {
    const res = await useFetch(
      { url: `/chat/${chat_id}/message`, method: 'POST', data: { message: message } },
      true
    );
    return Promise.resolve(message);
  };
};
