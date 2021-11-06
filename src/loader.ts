import { v4 as uuidv4 } from 'uuid';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import type { Group, Texture, CubeTexture } from 'three';
import { CubeTextureLoader, TextureLoader } from 'three';
import type {
  LoaderCallback,
  LoaderItem,
  LoaderOnLoadedCallback,
  LoaderOnLoadedData,
} from './types';
import Axios from 'axios';

export class Loader {
  private static subs: {
    [id: string]: LoaderCallback;
  } = {};
  private static onLoadedSubs: {
    [id: string]: LoaderOnLoadedCallback;
  } = {};
  private static fbxLoader = new FBXLoader();
  private static gltfLoader = new GLTFLoader();
  private static textureLoader = new TextureLoader();
  private static cubeTextureLoader = new CubeTextureLoader();
  private static items: LoaderItem[] = [];
  private static loadedItemsCount = 0;

  private static trigger(type: 'started' | 'done') {
    for (const id in this.subs) {
      this.subs[id]({
        items: this.items.map((e) => e.path),
        type,
        loadedItemsCount: this.loadedItemsCount,
      });
    }
  }
  private static triggerProgress(item: LoaderItem, progress: number) {
    for (const id in this.subs) {
      this.subs[id]({
        items: this.items.map((e) => e.path),
        type: 'progress',
        loadedItemsCount: this.loadedItemsCount,
        item: {
          path: item.path,
          name: item.name,
          progress,
        },
      });
    }
  }
  private static triggerOnLoaded(item: LoaderItem, data: LoaderOnLoadedData) {
    for (const id in this.onLoadedSubs) {
      this.onLoadedSubs[id](item, data);
    }
  }
  private static async loadFbx(item: LoaderItem): Promise<Group> {
    this.triggerProgress(item, 0);
    return new Promise<Group>((resolve, reject) => {
      this.fbxLoader.load(
        item.path as string,
        (fbx) => {
          this.triggerProgress(item, 100);
          resolve(fbx);
        },
        (progress) => {
          this.triggerProgress(item, (progress.loaded / progress.total) * 100);
        },
        (err) => {
          this.triggerProgress(item, 100);
          reject(err);
        },
      );
    });
  }
  private static async loadGltf(item: LoaderItem): Promise<GLTF> {
    this.triggerProgress(item, 0);
    return new Promise<GLTF>((resolve, reject) => {
      this.gltfLoader.load(
        item.path as string,
        (gltf) => {
          this.triggerProgress(item, 100);
          resolve(gltf);
        },
        (progress) => {
          this.triggerProgress(item, (progress.loaded / progress.total) * 100);
        },
        (err) => {
          this.triggerProgress(item, 100);
          reject(err);
        },
      );
    });
  }
  private static async loadTexture(item: LoaderItem): Promise<Texture> {
    this.triggerProgress(item, 0);
    return new Promise<Texture>((resolve, reject) => {
      this.textureLoader.load(
        item.path as string,
        (texture) => {
          this.triggerProgress(item, 100);
          resolve(texture);
        },
        (progress) => {
          this.triggerProgress(item, (progress.loaded / progress.total) * 100);
        },
        (err) => {
          this.triggerProgress(item, 100);
          reject(err);
        },
      );
    });
  }
  private static async loadCubeTexture(item: LoaderItem): Promise<CubeTexture> {
    this.triggerProgress(item, 0);
    return new Promise<CubeTexture>((resolve, reject) => {
      this.cubeTextureLoader.load(
        item.path as string[],
        (texture) => {
          this.triggerProgress(item, 100);
          resolve(texture);
        },
        (progress) => {
          this.triggerProgress(item, (progress.loaded / progress.total) * 100);
        },
        (err) => {
          this.triggerProgress(item, 100);
          reject(err);
        },
      );
    });
  }
  private static async loadString(item: LoaderItem): Promise<string> {
    this.triggerProgress(item, 0);
    const result = await Axios({
      url: item.path as string,
      method: 'get',
      onDownloadProgress: (progress) => {
        this.triggerProgress(item, (progress.loaded / progress.total) * 100);
      },
    });
    return result.data;
  }

  static subscribe(callback: LoaderCallback): () => void {
    const id = uuidv4();
    this.subs[id] = callback;
    return () => {
      delete this.subs[id];
    };
  }
  static register(item: LoaderItem): void {
    this.items.push(item);
  }
  static onLoaded(callback: LoaderOnLoadedCallback): () => void {
    const id = uuidv4();
    this.onLoadedSubs[id] = callback;
    return () => {
      delete this.onLoadedSubs[id];
    };
  }
  static async run(): Promise<void> {
    this.loadedItemsCount = 0;
    this.trigger('started');
    let loop = true;
    while (loop) {
      const item = this.items.pop();
      if (!item) {
        loop = false;
      } else {
        switch (item.type) {
          case 'fbx':
            {
              this.triggerOnLoaded(item, await this.loadFbx(item));
            }
            break;
          case 'gltf':
            {
              this.triggerOnLoaded(item, await this.loadGltf(item));
            }
            break;
          case 'texture':
            {
              this.triggerOnLoaded(item, await this.loadTexture(item));
            }
            break;
          case 'cubeTexture':
            {
              this.triggerOnLoaded(item, await this.loadCubeTexture(item));
            }
            break;
          case 'string':
            {
              this.triggerOnLoaded(item, await this.loadString(item));
            }
            break;
        }
        this.loadedItemsCount++;
      }
    }
    this.trigger('done');
  }
}
