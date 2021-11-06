import type { BoxCorners, Point3D } from '../types';

export class BoundingBox {
  constructor(
    public corners: BoxCorners,
    public position: Point3D,
  ) {}
}
