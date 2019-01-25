const render = require('./render.js');
const fs = require('fs-extra');
const path = require('path');

async function main(file) {
  return render(await fs.readFile(path.resolve(__dirname, file), 'utf-8'));
}

main('examplecomponent.html').then(result => console.log(result));
