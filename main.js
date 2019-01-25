const { Compiler } = require('@adobe/htlengine');
const requireFromString = require('require-from-string');

const GLOBALS = {
  headerComponent: {
    title: 'Hello, World!',
    description: 'Some stuff.'
  }
};

const compiler = new Compiler()
  .withOutputDirectory('')
  .includeRuntime(true)
  .withRuntimeVar(Object.keys(GLOBALS))
  .withRuntimeGlobalName('it');

async function main() {
  // Why does "compileToString" return a string of JavaScript?!
  const js = await compiler.compileToString("<h1>${headerComponent.title}</h1><p>${headerComponent.description}</p>");

  const { main } = requireFromString(js);
  const { body } = await main(GLOBALS);
  return body;
}

main()
.then(body => console.log(body));
