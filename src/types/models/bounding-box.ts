import type { Point3D } from "../point";

/**
 * ```
 *      o-----------o 
 *    z/|          /|
 *    o-----------o |
 *    | |x        | |
 * c- | o-----------o
 *    |/-a        |/
 *    o-----------o y
 *          |
 *          b
 * ```
 */
export interface BoxDimensions {
  /**
   * Width - X axis
   */
  w: number;
  /**
   * Height - Z axis
   */
  h: number;
  /**
   * Depth - Y axis
   */
  d: number;
}

/**
 * ```
 *   7-----------6
 * z/|          /|
 * 4-----------5 |
 * | |x        | |
 * | 3-----------2
 * |/          |/
 * 0-----------1 y
 * ```
 */
export type BoxCorners = [
  Point3D,
  Point3D,
  Point3D,
  Point3D,
  Point3D,
  Point3D,
  Point3D,
  Point3D,
];
