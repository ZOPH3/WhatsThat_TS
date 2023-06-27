import { logger, consoleTransport } from 'react-native-logs';

export enum logType {
  debug,
  info,
  warn,
  error,
  success,
}

const defaultConfig = {
  levels: {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3,
    success: 4,
  },
  severity: 'debug',
  transport: consoleTransport,
  transportOptions: {
    colors: {
      info: 'blueBright',
      warn: 'yellowBright',
      error: 'redBright',
      success: 'greenBright',
    },
    extensionColors: {
      root: 'magenta',
      component: 'green',
      dispatcher: 'yellow',
      api: 'cyan',
      polling: 'white',
      cache: 'blue',
    },
  },
  async: true,
  dateFormat: 'time',
  printLevel: true,
  printDate: true,
  enabled: true,
};

const log = logger.createLogger(defaultConfig);

export const rootLog = log.extend('root');
export const componentLog = log.extend('component');
export const dispatcherLog = log.extend('dispatcher');
export const apiLog = log.extend('api');
export const pollingLog = log.extend('polling');
export const cacheLog = log.extend('cache');

export function logOutput(type: logType, message: string) {
  switch (type) {
    case logType.warn:
      log.warn(message);
      break;
    case logType.error:
      log.error(message);
      break;
    case logType.debug:
      log.debug(message);
      break;
    case logType.success:
      log.success(message);
      break;
    case logType.info:
      log.info(message);
      break;
    default:
      log.debug(message);
  }
}

export default log;
