// Match Vite's asset imports when rendering components in Node tests.
import { registerHooks } from 'node:module';
registerHooks({
  load(url, context, nextLoad) {
    if (/\.(?:jpe?g|png|webp|svg)$/.test(url)) {
      return { format: 'module', source: `export default ${JSON.stringify(url)};`, shortCircuit: true };
    }
    return nextLoad(url, context);
  },
});
