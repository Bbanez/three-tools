import type { BoxCorners, Point3D } from '../types';

export class BoundingBox {
  public corners: BoxCorners;
  public position: Point3D;
  constructor({
    corners,
    position,
  }: {
    corners: BoxCorners;
    position: Point3D;
  }) {
    this.corners = corners;
    this.position = position;
  }
}
