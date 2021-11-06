import { v4 as uuidv4 } from 'uuid';
import type { TickerCallback } from './types';

export class Ticker {
  private static subs: {
    [id: string]: TickerCallback;
  } = {};
  private static time = Date.now();
  private static timeDelta = 0;

  static tick() {
    this.timeDelta = Date.now() - this.time;
    this.time = Date.now();
    for (const id in this.subs) {
      this.subs[id](this.time, this.timeDelta);
    }
  }
  static subscribe(callback: TickerCallback): () => void {
    const id = uuidv4();
    this.subs[id] = callback;
    return () => {
      delete this.subs[id];
    };
  }
}
