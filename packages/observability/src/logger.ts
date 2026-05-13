// Centralized logger factory. The blueprint (§5 packages/observability)
// designates this package as the single place structured-logging conventions
// live, so apps/api, apps/worker, and future services produce log streams
// that aggregate cleanly.
import { type Logger as PinoLogger, type LoggerOptions as PinoLoggerOptions, pino } from 'pino';

export type Logger = PinoLogger;

export interface LoggerOptions {
  /** pino log level. */
  level?: 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal';
  /** Service name, included in every log line as `service`. */
  service: string;
  /** Optional environment label. */
  env?: string;
  /** Optional pretty-print in development. */
  pretty?: boolean;
}

export function createLogger({ level = 'info', service, env, pretty }: LoggerOptions): Logger {
  // exactOptionalPropertyTypes forces us to omit optional keys when the value
  // would be undefined; build pino's options conditionally.
  const opts: PinoLoggerOptions = {
    level,
    base: { service, env: env ?? null },
    timestamp: pino.stdTimeFunctions.isoTime,
    formatters: {
      level: (label) => ({ level: label }),
    },
  };
  if (pretty) {
    opts.transport = {
      target: 'pino-pretty',
      options: { colorize: true, translateTime: 'SYS:HH:MM:ss.l' },
    };
  }
  return pino(opts);
}
