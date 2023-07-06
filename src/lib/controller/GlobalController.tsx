/* eslint-disable react-hooks/rules-of-hooks */
import { useApi } from '../context/api';
import log, { apiLog } from '../util/LoggerUtil';

const useGlobalController = () => {
  const { apiCaller } = useApi();

  if (!apiCaller) {
    log.error('Unable to find Auth API...');
    throw new Error('Unable to find Auth API...');
  }

  const checkServerConnection = async () => {
    try {
      const response = await apiCaller({ url: `/`, method: 'GET' }, false);
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
