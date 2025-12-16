import { Table } from '../../src/core/Table';
import { Robot } from '../../src/core/Robot';
import { CommandProcessor } from '../../src/cli/CommandProcessor';

describe('CommandProcessor integration', () => {
  let table: Table;
  let robot: Robot;
  let processor: CommandProcessor;

  beforeEach(() => {
    table = new Table(5, 5);
    robot = new Robot(table);
    processor = new CommandProcessor(robot);
  });

  it('handles a simple move and report', () => {
    processor.process('PLACE 0,0,NORTH');
    processor.process('MOVE');
    const output = processor.process('REPORT');

    expect(output).toBe('0,1,NORTH');
  });

  it('ignores commands before PLACE', () => {
    processor.process('MOVE');
    processor.process('LEFT');
    const output = processor.process('REPORT');

    expect(output).toBeNull();
  });

  it('handles rotation and movement sequence', () => {
    processor.process('PLACE 1,2,EAST');
    processor.process('MOVE');
    processor.process('MOVE');
    processor.process('LEFT');
    processor.process('MOVE');

    const output = processor.process('REPORT');
    expect(output).toBe('3,3,NORTH');
  });

  it('prevents falling off the table', () => {
    processor.process('PLACE 0,4,NORTH');
    processor.process('MOVE');

    const output = processor.process('REPORT');
    expect(output).toBe('0,4,NORTH');
  });

  it('ignores invalid PLACE commands', () => {
    processor.process('PLACE 10,10,NORTH');
    const output = processor.process('REPORT');

    expect(output).toBeNull();
  });
});
