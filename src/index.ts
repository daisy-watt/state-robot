import readline from 'readline';
import { Table } from './core/Table';
import { Robot } from './core/Robot';
import { CommandProcessor } from './cli/CommandProcessor';

const table = new Table(5, 5);
const robot = new Robot(table);
const processor = new CommandProcessor(robot);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('beeeeboopBOP Robot Challenge initialised');
console.log('Robot state Sim');
console.log('Enter control (PLACE, MOVE, LEFT, RIGHT, REPORT)');
console.log('Press Ctrl+C to exit');

rl.on('line', (input: string) => {
  const output = processor.process(input);

  if (output) {
    console.log(output);
  }
});