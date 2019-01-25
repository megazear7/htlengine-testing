const { Compiler } = require('@adobe/htlengine');
const requireFromString = require('require-from-string');
const path = require('path');
const fs = require('fs-extra');
const compiler = new Compiler()
  .includeRuntime(true)
  .withRuntimeGlobalName('it');

async function main(file) {
  const template = await fs.readFile(path.resolve(__dirname, file), 'utf-8');
  const js = await compiler.compileToString(template);
  const { main } = requireFromString(js);
  const { body } = await main({});
  return body;
}

main('examplecomponent.html')
.then(body => console.log(body));
