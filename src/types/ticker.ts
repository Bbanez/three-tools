export interface TickerCallback {
  (cTime: number, deltaTime: number): void;
}
