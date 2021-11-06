export class Logger {
  static log(...items: unknown[]) {
    // eslint-disable-next-line no-console
    console.log(...items);
  }
  static warn(...items: unknown[]) {
    // eslint-disable-next-line no-console
    console.warn(...items);
  }
  static error(...items: unknown[]) {
    // eslint-disable-next-line no-console
    console.error(...items);
  }
}
