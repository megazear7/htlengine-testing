const { Compiler } = require('@adobe/htlengine');
const requireFromString = require('require-from-string');
const path = require('path');
const fs = require('fs-extra');

const GLOBALS = {
  headerComponent: {
    title: 'Hello, World!',
    description: 'Some stuff.'
  }
};

const compiler = new Compiler()
  .includeRuntime(true)
  .withRuntimeVar(Object.keys(GLOBALS))
  .withRuntimeGlobalName('it');

async function main() {
  const template = await fs.readFile(path.resolve(__dirname, 'template.html'), 'utf-8');
  const js = await compiler.compileToString(template);
  const { main } = requireFromString(js);
  const { body } = await main(GLOBALS);
  return body;
}

main().then(body => console.log(body));
