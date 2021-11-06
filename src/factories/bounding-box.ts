import type { Euler, Vector3 } from 'three';
import type { BoundingBox } from '../models';
import { BoxDimensions, Orientation3D, Point3D } from '../types';

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

    const A = new Point3D({
      x: position.x - a2,
      y: position.y - b2,
      z: position.z - c2,
    });

    const B: Point3D = {
      x: dimensions.w * Math.cos(orientation)
    }
    const initVec = new Point3D({x: dimensions.w, y: dimensions.d, z: dimensions.h});
    return new BoundingBox({corners: [A], position});
  }
}
