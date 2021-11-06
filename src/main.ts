import { Loader } from './loader';
import type { Game, GameConfig } from './types';

export function createGame(config: GameConfig): Game {
  async function run() {
    await Loader.run();
    if (config.onReady) {
      config.onReady();
    }
  }

  return {
    run,
  };
}
