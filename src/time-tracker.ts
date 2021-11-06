import { Logger } from './logger';

export class TimeTracker {
  static timeToComplete<T>(
    message: string,
    fn: () => T | Promise<T>,
  ): T | Promise<T> {
    Logger.log(message);
    const timeOffset = Date.now();
    const res = fn();
    if (res instanceof Promise) {
      return new Promise<T>((resolve, reject) => {
        res
          .then((output) => {
            Logger.log(
              `${message} done in ${(Date.now() - timeOffset) / 1000}s`,
            );
            resolve(output);
          })
          .catch((err) => {
            Logger.log(
              `${message} failed after ${(Date.now() - timeOffset) / 1000}s`,
            );
            reject(err);
          });
      });
    } else {
      Logger.log(`${message} done in ${(Date.now() - timeOffset) / 1000}s`);
      return res;
    }
  }
}
