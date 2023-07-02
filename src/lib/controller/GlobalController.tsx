/* eslint-disable react-hooks/rules-of-hooks */
import { useApiContext } from '../context/ApiContext';
import log, { apiLog, pollingLog } from '../util/LoggerUtil';

const useGlobalController = () => {
  const { useFetch } = useApiContext();

  if (!useFetch) {
    log.error('Unable to find Auth API...');
    throw new Error('Unable to find Auth API...');
  }

  const checkServerConnection = async () => {
    try {
      const response = await useFetch({ url: `/`, method: 'GET' }, false);
      if (!response || !response.msg) return false;
      return response.msg === 'Server up';
    } catch (err) {
      apiLog.warn(`Checking server connection: ${err}`);
      return false;
    }
  };

  return { checkServerConnection };
};

export default useGlobalController;
