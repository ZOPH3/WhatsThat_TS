import { logger, consoleTransport } from "react-native-logs";
export enum logType {
  debug,
  info,
  warn,
  error,
  success
}

const defaultConfig = {
  levels: {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3,
    success: 4,
  },
  severity: "debug",
  transport: consoleTransport,
  transportOptions: {
    colors: {
      info: "blueBright",
      warn: "yellowBright",
      error: "redBright",
      success: "greenBright"
    },
  },
  async: true,
  dateFormat: "time",
  printLevel: true,
  printDate: true,
  enabled: true,
};

const log = logger.createLogger(defaultConfig);

export function logOutput(type: logType, message: string) {
  switch (type) {
    case logType.warn:
      log.warn("[WARN] ", message);
      break;
    case logType.error:
      log.error("[ERROR] ", message);
      break;
    case logType.debug:
      log.debug("[DEBUG] ", message);
      break;
      case logType.success:
        log.success("[Success] ", message);
        break;
    case logType.info:
      log.info("[INFO] ", message);
      break;
    default:
      log.debug(message);
  }
}

export default log;
