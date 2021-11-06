import type { CubeTexture, Group, Texture } from 'three';
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

export interface LoaderCallbackData {
  type: 'progress' | 'started' | 'done';
  loadedItemsCount: number;
  items: Array<string | string[]>;
  item?: {
    progress: number;
    name: string;
    path: string | string[];
  };
}

export interface LoaderCallback {
  (data: LoaderCallbackData): void;
}

export interface LoaderItem {
  path: string | string[];
  name: string;
  type: 'string' | 'fbx' | 'gltf' | 'texture' | 'cubeTexture';
}

export type LoaderOnLoadedData = Group | GLTF | Texture | CubeTexture | string;

export interface LoaderOnLoadedCallback {
  (item: LoaderItem, data: LoaderOnLoadedData): () => void;
}
