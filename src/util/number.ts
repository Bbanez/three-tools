export class NumberUtil {
  static toFixed(n: number, decimals: number): number {
    return parseFloat(n.toFixed(decimals));
  }
}
