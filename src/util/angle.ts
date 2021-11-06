export class AngleUtil {
  static toDeg(rad: number): number {
    return (rad * 180) / Math.PI;
  }
  static toRad(deg: number): number {
    return (deg * Math.PI) / 180;
  }
}
