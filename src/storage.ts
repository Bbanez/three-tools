export class Storage {
  private static readonly prefix = 'game_';

  static get<T>(key: string, json?: boolean): T | null {
    const result = localStorage.getItem(this.prefix + key);
    if (!result) {
      return null;
    }
    if (json) {
      return JSON.parse(result);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return result as any;
  }

  static set<T>(key: string, value: T | string): void {
    if (typeof value === 'object') {
      localStorage.setItem(this.prefix + key, JSON.stringify(value));
    } else {
      localStorage.setItem(this.prefix + key, value as string);
    }
  }

  static remove(key: string) {
    localStorage.removeItem(this.prefix + key);
  }

  static all() {
    const ls = JSON.parse(JSON.stringify(localStorage));
    const output: {
      [key: string]: unknown;
    } = {};
    for (const key in ls) {
      if (key.startsWith(this.prefix)) {
        output[key] = ls[key];
      }
    }
    return output;
  }

  static clear() {
    const ls = JSON.parse(JSON.stringify(localStorage));
    for (const key in ls) {
      if (key.startsWith(this.prefix)) {
        localStorage.removeItem(key);
      }
    }
  }
}
