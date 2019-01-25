const { Compiler } = require('@adobe/htlengine');
const { Runtime } = require('@adobe/htlengine');

let headerComponent = {
  title: 'Hello, World!',
  description: 'Some stuff.'
};

// Why in the world does "withRuntimeVar" take a string of a variable name????
const compiler = new Compiler()
      .withOutputDirectory('')
      .includeRuntime(true)
      .withRuntimeVar('headerComponent')
      .withRuntimeGlobalName('it');

compiler.compileToString(`
  <h1>${headerComponent.title}</h1>
  <p>${headerComponent.description}</p>
`).then(js => {
  // Am I using the right method to compile? Why do I have to eval a string of JavaScript?
  eval(js);

  main = async function main(resource) {
    const runtime = new Runtime();
    runtime.setGlobal(resource);
    await run(runtime);
    return {
      body: runtime.stream
    };
  };

  // What is supposed to get passed into this method?
  result = main('');

  result.then(({body}) => console.log(body));
});
