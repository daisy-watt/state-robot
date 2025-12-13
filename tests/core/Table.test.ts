import { Table } from '../../src/core/Table';

describe('Table', () => {
  describe('isValidPosition', () => {
    it('returns true for positions within bounds', () => {
      const table = new Table(5, 5);

      expect(table.isValidPosition(0, 0)).toBe(true);
      expect(table.isValidPosition(4, 4)).toBe(true);
      expect(table.isValidPosition(2, 3)).toBe(true);
    });

    it('returns false for positions outside bounds', () => {
      const table = new Table(5, 5);

      expect(table.isValidPosition(-1, 0)).toBe(false);
      expect(table.isValidPosition(0, -1)).toBe(false);
      expect(table.isValidPosition(5, 0)).toBe(false);
      expect(table.isValidPosition(0, 5)).toBe(false);
    });
  });
});
