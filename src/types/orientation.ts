export class Orientation2D {
  constructor(
    /**
     * Rotation around Z axis
     */
    public z: number,
  ) {}
}

export class Orientation3D {
  constructor(
    /**
     * Rotation around X axis
     */
    public x: number,
    /**
     * Rotation around Y axios
     */
    public y: number,
    /**
     * Rotation around Z axios
     */
     public z: number,
  ) {}
}
