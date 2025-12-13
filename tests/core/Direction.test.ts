import { Direction, rotateLeft, rotateRight } from '../../src/core/Direction';

describe('Direction rotation', () => {
  it('rotates left correctly', () => {
    expect(rotateLeft(Direction.NORTH)).toBe(Direction.WEST);
    expect(rotateLeft(Direction.WEST)).toBe(Direction.SOUTH);
    expect(rotateLeft(Direction.SOUTH)).toBe(Direction.EAST);
    expect(rotateLeft(Direction.EAST)).toBe(Direction.NORTH);
  });

  it('rotates right correctly', () => {
    expect(rotateRight(Direction.NORTH)).toBe(Direction.EAST);
    expect(rotateRight(Direction.EAST)).toBe(Direction.SOUTH);
    expect(rotateRight(Direction.SOUTH)).toBe(Direction.WEST);
    expect(rotateRight(Direction.WEST)).toBe(Direction.NORTH);
  });
});
