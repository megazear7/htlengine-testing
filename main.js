const { Compiler } = require('@adobe/htlengine');
const requireFromString = require('require-from-string');

let headerComponent = {
  title: 'Hello, World!',
  description: 'Some stuff.'
};

// Why does "withRuntimeVar" take a string of a variable name?!
const compiler = new Compiler()
  .withOutputDirectory('')
  .includeRuntime(true)
  .withRuntimeVar('headerComponent')
  .withRuntimeGlobalName('it');

async function main() {
  // Why does "compileToString" return a string of JavaScript?!
  const js = await compiler.compileToString(`
    <h1>${headerComponent.title}</h1>
    <p>${headerComponent.description}</p>
  `);

  const { main } = requireFromString(js);
  const { body } = await main({});
  return body;
}

main()
.then(body => console.log(body));
