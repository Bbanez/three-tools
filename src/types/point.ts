import { AngleUtil } from '../util';
import type { Orientation2D, Orientation3D } from './orientation';

export class Point2D {
  public x: number;
  public y: number;
  /**
   * Angle with X axis.
   */
  public a: number;
  public c: number;
  constructor({
    x,
    y,
    a,
    c,
  }: {
    x: number;
    y: number;
    a?: number;
    c?: number;
  }) {
    this.x = x;
    this.y = y;
    this.c = c ? c : Math.sqrt(x * x + y * y);
    this.a = a ? a : Math.acos(x / this.c);
  }

  rotate(angle: number): void {
    this.a += angle;
    this.x = this.c * Math.cos(this.a);
    this.y = this.c * Math.sin(this.a);
  }
  angleDeg(): number {
    return AngleUtil.toDeg(this.a);
  }
  round(decimals: number): Point2D {
    const output = new Point2D({ ...this });
    output.x = parseFloat(output.x.toFixed(decimals));
    output.y = parseFloat(output.y.toFixed(decimals));
    output.c = parseFloat(output.c.toFixed(decimals));
    output.a = parseFloat(output.a.toFixed(decimals));
    return output;
  }
  recalc(): void {
    this.c = Math.sqrt(this.x * this.x + this.y * this.y);
    this.a = Math.acos(this.x / this.c);
  }
  set(x: number, y: number): void {
    this.x = x;
    this.y = y;
    this.recalc();
  }
  setX(x: number): void {
    this.x = x;
    this.recalc();
  }
  setY(y: number): void {
    this.y = y;
    this.recalc();
  }
  setA(a: number): void {
    this.a = a;
    this.x = this.c / Math.cos(this.a);
    this.y = this.c / Math.sin(this.a);
  }
}

export class Point3D {
  public x: number;
  public y: number;
  public z: number;
  /**
   * Angle with X axis.
   */
  public a: number;
  /**
   * Angle with Y axis.
   */
  public b: number;
  public c: number;
  public c2: number;
  constructor({
    x,
    y,
    z,
    a,
    b,
    c,
    c2,
  }: {
    x: number;
    y: number;
    z: number;
    a?: number;
    b?: number;
    c?: number;
    c2?: number;
  }) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.c = c ? c : Math.sqrt(x * x + y * y);
    this.a = a ? a : Math.acos(x / this.c);
    this.c2 = c2 ? c2 : Math.sqrt(this.c * this.c + z * z);
    this.b = b ? b : Math.acos(this.c / this.c2);
  }

  rotate(a: number, b: number): void {
    this.a += a;
    this.b += b;
    this.c = this.c2 * Math.cos(this.b);
    this.z = this.c2 * Math.sin(this.b);
    this.x = this.c * Math.cos(this.a);
    this.y = this.c * Math.sin(this.a);
  }
  angleDeg(): [number, number] {
    return [AngleUtil.toDeg(this.a), AngleUtil.toDeg(this.b)];
  }
  round(decimals: number): Point3D {
    const output = new Point3D(this.x, this.y, this.z);
    output.x = parseFloat(output.x.toFixed(decimals));
    output.y = parseFloat(output.y.toFixed(decimals));
    output.z = parseFloat(output.z.toFixed(decimals));
    output.c = parseFloat(output.c.toFixed(decimals));
    output.c2 = parseFloat(output.c2.toFixed(decimals));
    output.a = parseFloat(output.a.toFixed(decimals));
    output.b = parseFloat(output.b.toFixed(decimals));
    return output;
  }
  recalc(): void {
    this.c = Math.sqrt(this.x * this.x + this.y * this.y);
    this.a = Math.acos(this.x / this.c);
    this.c2 = Math.sqrt(this.c * this.c + this.z * this.z);
    this.b = Math.acos(this.c / this.c2);
  }
  set(x: number, y: number, z: number): void {
    this.x = x;
    this.y = y;
    this.z = z;
    this.recalc();
  }
  setX(x: number): void {
    this.x = x;
    this.recalc();
  }
  setY(y: number): void {
    this.y = y;
    this.recalc();
  }
  setZ(z: number): void {
    this.z = z;
    this.recalc();
  }
  setA(a: number): void {
    this.a = a;
    this.x = this.c / Math.cos(this.a);
    this.y = this.c / Math.sin(this.a);
  }
  setB(b: number): void {
    this.b = b;
    this.c = this.c2 / Math.cos(this.b);
    this.z = this.c2 / Math.sin(this.b);
    this.x = this.c / Math.cos(this.a);
    this.y = this.c / Math.sin(this.a);
  }
  setOrientationEuler(x: number, y: number, z: number): void {
    this.a = z;
  }
}

export class PO2D {
  constructor(public position: Point2D, public orientation: Orientation2D) {}
}
export class PO3D {
  constructor(public position: Point3D, public orientation: Orientation3D) {}
}
