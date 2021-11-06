export interface GameConfig {
  element: HTMLElement;
  onReady?: () => void;
}

export interface Game {
  run(): Promise<void>;
}
