const { Compiler } = require('@adobe/htlengine');
//const requireFromString = require('browser-require');

const path = require('path');
const fse = require('fs');
//const { Runtime } = require('./runtime/Runtime');
const compiler = new Compiler()
  .includeRuntime(true)
//  .withRuntimeGlobalName('it')
//  .withRuntimeHTLEngine('./runtime/Runtime')
  .withCodeTemplate("const { Runtime } = require('MOD_HTLENGINE');\n\nfunction run(runtime) {\n  const lengthOf = function (c) {\n    return Array.isArray(c) ? c.length : Object.keys(c).length;\n  };\n\n  const out = runtime.out.bind(runtime);\n  const exec = runtime.exec.bind(runtime);\n  const xss = runtime.xss.bind(runtime);\n  const listInfo = runtime.listInfo.bind(runtime);\n  const use = runtime.use.bind(runtime);\n  const slyResource = runtime.resource.bind(runtime);\n  const call = runtime.call.bind(runtime);\n  const template = runtime.template.bind(runtime);\n\n  // TEMPLATES\n\n  return runtime.run(function* () {\n\n    // RUNTIME_GLOBALS\n\n    // CODE\n  });\n}\n\nmodule.exports.main = async function main(resource) {\n  const runtime = new Runtime();\n  runtime.setGlobal(resource);\n  await run(runtime);\n  return {\n    body: runtime.stream\n  };\n};\n");

async function render(template) {
  const js = await compiler.compileToString(template);
//  const filename = path.resolve('', './out.js');
//  await fse.writeFile(filename, js, 'utf-8');

  // const { main } = requireFromString(js,'compileOut');
  // const { body } = await main({});
  return js;
}

// function requireFromString(src, filename) {
//   var Module = module.constructor;
//   var m = new Module();
//   m._compile(src, filename);
//   return m.exports;
// }


module.exports = render;
