const { Compiler } = require('@adobe/htlengine');
const requireFromString = require('require-from-string');
const compiler = new Compiler()
  .includeRuntime(true)
  .withRuntimeGlobalName('it');

async function render(template) {
  const js = await compiler.compileToString(template);
  const { main } = requireFromString(js);
  const { body } = await main({});
  return body;
}

module.exports = render;
