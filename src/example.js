const render = require('./render.js');
//const fs = require('fs-extra');
const path = require('path');
import myfile from 'html-loader!./examplecomponent.html';
//const myfile = require('./examplecomponent.html')

async function main(file) {
  return render(await file);
}

main(myfile).then(result => console.log(result));
