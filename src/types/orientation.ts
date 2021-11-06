export interface Orientation2D {
  /**
   * Rotation around Y axis
   */
  g: number;
}

export interface Orientation3D extends Orientation2D {
  /**
   * Rotation around Z axios
   */
  a: number;
  /**
   * Rotation around X axis
   */
  b: number;
}
