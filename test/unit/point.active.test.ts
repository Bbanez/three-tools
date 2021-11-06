import { expect } from 'chai';
import { Point2D, Point3D } from '../../src/types';
import { AngleUtil, NumberUtil } from '../../src/util';

describe('Point2D', () => {
  it('should create Point2d', () => {
    const p2 = new Point2D({ x: 1, y: 1 });
    expect(p2).to.have.property('x').to.be.a('number').to.eq(1);
    expect(p2).to.have.property('y').to.be.a('number').to.eq(1);
    expect(p2).to.have.property('a').to.be.a('number');
    expect(p2.angleDeg().toFixed(0)).to.eq('45');
  });
  it('should rotate the Point around origin by 15 deg', () => {
    const p2 = new Point2D({ x: 1, y: 1 });
    p2.rotate(AngleUtil.toRad(15));
    expect(NumberUtil.toFixed(p2.angleDeg(), 0)).to.eq(60);
  });
});

describe('Point3D', () => {
  it('should create Point3D', () => {
    const p3 = new Point3D(1, 1, 1);
    expect(p3).to.have.property('x').to.be.a('number').to.eq(1);
    expect(p3).to.have.property('y').to.be.a('number').to.eq(1);
    expect(p3).to.have.property('z').to.be.a('number').to.eq(1);
    expect(p3).to.have.property('c').to.be.a('number');
    expect(p3).to.have.property('c2').to.be.a('number');
    expect(p3).to.have.property('a').to.be.a('number');
    expect(p3).to.have.property('b').to.be.a('number');
    const angles = p3.angleDeg();
    expect(NumberUtil.toFixed(angles[0], 0)).to.eq(45);
    expect(NumberUtil.toFixed(angles[1], 0)).to.eq(35);
  });
});
