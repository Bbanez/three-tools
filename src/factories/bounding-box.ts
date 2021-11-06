import type { Euler, Vector3 } from 'three';
import type { BoundingBox } from '../models';
import type { BoxDimensions, Orientation3D, Point3D } from '../types';

export class BoundingBoxFactory {
  static instance({
    position,
    orientation,
    dimensions,
  }: {
    position: Point3D | Vector3;
    orientation: Euler | Orientation3D;
    dimensions: BoxDimensions;
  }): BoundingBox {
    const a2 = dimensions.w / 2;
    const b2 = dimensions.d / 2;
    const c2 = dimensions.h / 2;

    const A: Point3D = {
      x: position.x - a2,
      y: position.y - b2,
      z: position.z - c2,
    };

    return new BoundingBox([A, {
      x: position.x + dimensions.w*
    }], position);
  }
}
