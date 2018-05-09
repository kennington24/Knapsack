const fs = require('fs');

function knapsack(items, capacity) {
  if (items === 0) {
    return {
      value: 0,
      size: 0,
      chosen: []
    };
  }

  for (let i = 1; i < items.length; i++) {
    let utility = items[i].value / items[i].size;
    items[i].utility = utility;
  }
  items.sort(function(a, b) {
    return b.utility - a.utility;
  });
  console.log(items);

  let sum = 0;
  let sack = [];

  for (let i = 0; i < items.length - 1; i++) {
    let remainder = capacity - sum;
    if (capacity - sum > items[i].size) {
      sum += items[i].size;
      sack.push(items[i]);
    }
  }
  return sack;
  console.log(sack);
}

const argv = process.argv.slice(2);

// add an error check to check the number of params
if (argv.length != 2) {
  console.error('usage: [filename] [capacity]');
  process.exit(1);
}

const filename = argv[0];
const capacity = argv[1];

//read file that was passed to the program
const filedata = fs.readFileSync(filename, 'utf8');

const lines = filedata.trim().split(/[\r\n]+/g);

// process lines
const items = [];

for (let l of lines) {
  const [index, size, value] = l.split(/\s+/g).map(n => parseInt(n));
  items[index] = {
    index,
    size,
    value
  };
}

console.log('Knapsack Implementation: ', knapsack(items, capacity));
